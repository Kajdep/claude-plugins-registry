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
        log('✓ Valid JSON syntax', 'green');
    } catch (error) {
        log(`✗ JSON parsing error: ${error.message}`, 'red');
        process.exit(1);
    }

    const requiredFields = ['name', 'description', 'plugins'];
    let hasErrors = false;

    for (const field of requiredFields) {
        if (!data[field]) {
            log(`✗ Missing required field: ${field}`, 'red');
            hasErrors = true;
        }
    }

    if (!hasErrors) {
        log('✓ All required top-level fields present', 'green');
    }

    if (!Array.isArray(data.plugins)) {
        log('✗ "plugins" must be an array', 'red');
        hasErrors = true;
    } else {
        log(`✓ Found ${data.plugins.length} plugin(s)`, 'green');

        data.plugins.forEach((plugin, index) => {
            log(`\n  Validating plugin ${index + 1}: ${plugin.name || plugin.id || 'unnamed'}`, 'yellow');

            const pluginRequired = ['id', 'name', 'description', 'author', 'repo', 'category', 'tags', 'installCmd'];
            const pluginErrors = [];

            pluginRequired.forEach(field => {
                if (!plugin[field]) {
                    log(`    ✗ Missing required field "${field}"`, 'red');
                    pluginErrors.push(field);
                    hasErrors = true;
                }
            });

            // Validate field types
            if (plugin.id && typeof plugin.id !== 'string') {
                log(`    ✗ "id" must be a string`, 'red');
                hasErrors = true;
            }

            if (plugin.name && typeof plugin.name !== 'string') {
                log(`    ✗ "name" must be a string`, 'red');
                hasErrors = true;
            }

            if (plugin.author && typeof plugin.author !== 'string') {
                log(`    ✗ "author" must be a string`, 'red');
                hasErrors = true;
            }

            if (plugin.repo && typeof plugin.repo !== 'string') {
                log(`    ✗ "repo" must be a string (format: username/repository)`, 'red');
                hasErrors = true;
            } else if (plugin.repo && !plugin.repo.includes('/')) {
                log(`    ✗ "repo" should be in format "username/repository"`, 'red');
                hasErrors = true;
            }

            if (plugin.category && typeof plugin.category !== 'string') {
                log(`    ✗ "category" must be a string`, 'red');
                hasErrors = true;
            }

            if (plugin.stars !== undefined && typeof plugin.stars !== 'number') {
                log(`    ✗ "stars" must be a number`, 'red');
                hasErrors = true;
            }

            if (plugin.tags && !Array.isArray(plugin.tags)) {
                log(`    ✗ "tags" must be an array`, 'red');
                hasErrors = true;
            } else if (plugin.tags && plugin.tags.length === 0) {
                log(`    ⚠ "tags" array is empty (consider adding relevant tags)`, 'yellow');
            }

            if (plugin.installCmd && typeof plugin.installCmd !== 'string') {
                log(`    ✗ "installCmd" must be a string`, 'red');
                hasErrors = true;
            }

            if (pluginErrors.length === 0) {
                log(`    ✓ Plugin structure valid`, 'green');
            }
        });
    }

    log('\n' + '='.repeat(50), 'blue');
    if (hasErrors) {
        log('✗ Validation failed. Please fix the errors above.', 'red');
        process.exit(1);
    } else {
        log('✓ All validations passed successfully!', 'green');
        log('✓ marketplace.json is ready for deployment!', 'blue');
        process.exit(0);
    }
}

validateMarketplace();
