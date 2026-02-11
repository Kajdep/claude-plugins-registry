#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const MARKETPLACE_PATH = path.join(__dirname, '..', '.claude-plugin', 'marketplace.json');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateMarketplace() {
  log('\n Starting marketplace.json validation...', 'blue');

  if (!fs.existsSync(MARKETPLACE_PATH)) {
    log('Error: marketplace.json not found at .claude-plugin/marketplace.json', 'red');
    process.exit(1);
  }

  let data;
  try {
    const content = fs.readFileSync(MARKETPLACE_PATH, 'utf8');
    data = JSON.parse(content);
    log('Valid JSON syntax', 'green');
  } catch (error) {
    log(`JSON parsing error: ${error.message}`, 'red');
    process.exit(1);
  }

  const requiredFields = ['$schema', 'name', 'description', 'owner', 'plugins'];
  let hasErrors = false;

  for (const field of requiredFields) {
    if (!data[field]) {
      log(`Missing required field: ${field}`, 'red');
      hasErrors = true;
    }
  }

  if (data.$schema !== 'https://anthropic.com/claude-code/marketplace.schema.json') {
    log('Invalid $schema. Must be: https://anthropic.com/claude-code/marketplace.schema.json', 'red');
    hasErrors = true;
  } else {
    log('Valid $schema URL', 'green');
  }

  if (typeof data.owner !== 'object' || Array.isArray(data.owner)) {
    log('"owner" must be an object with name, email, and url', 'red');
    hasErrors = true;
  } else {
    const ownerFields = ['name', 'email', 'url'];
    for (const field of ownerFields) {
      if (!data.owner[field]) {
        log(`Missing owner.${field}`, 'red');
        hasErrors = true;
      }
    }
    if (!hasErrors) {
      log('Valid owner object', 'green');
    }
  }

  if (!Array.isArray(data.plugins)) {
    log('"plugins" must be an array', 'red');
    hasErrors = true;
  } else {
    log(`Found ${data.plugins.length} plugin(s)`, 'green');

    data.plugins.forEach((plugin, index) => {
      log(`\n  Validating plugin ${index + 1}: ${plugin.name || 'unnamed'}`, 'yellow');

      const pluginRequired = ['name', 'source', 'description', 'category'];
      pluginRequired.forEach(field => {
        if (!plugin[field]) {
          log(`  Plugin ${index + 1}: Missing required field "${field}"`, 'red');
          hasErrors = true;
        }
      });

      if (plugin.source) {
        if (typeof plugin.source !== 'object') {
          log(`  Plugin ${index + 1}: "source" must be an object`, 'red');
          hasErrors = true;
        } else if (!plugin.source.source) {
          log(`  Plugin ${index + 1}: Missing "source.source" field`, 'red');
          hasErrors = true;
        } else if (plugin.source.source === 'github' && !plugin.source.repo) {
          log(`  Plugin ${index + 1}: GitHub source requires "repo" field`, 'red');
          hasErrors = true;
        } else if (plugin.source.source === 'url' && !plugin.source.url) {
          log(`  Plugin ${index + 1}: URL source requires "url" field`, 'red');
          hasErrors = true;
        } else {
          log(`  Plugin ${index + 1}: Valid source configuration`, 'green');
        }
      }

      if (plugin.tags && !Array.isArray(plugin.tags)) {
        log(`  Plugin ${index + 1}: "tags" must be an array`, 'red');
        hasErrors = true;
      }
    });
  }

  log('\n' + '='.repeat(50), 'blue');
  if (hasErrors) {
    log('Validation failed. Please fix the errors above.', 'red');
    process.exit(1);
  } else {
    log('All validations passed successfully!', 'green');
    log('marketplace.json is ready for deployment!', 'blue');
    process.exit(0);
  }
}

validateMarketplace();
