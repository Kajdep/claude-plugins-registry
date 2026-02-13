/**
 * Validates marketplace.json for plugin submissions.
 * Run by GitHub Actions on every PR that modifies marketplace.json.
 * 
 * Checks:
 * 1. Valid JSON syntax
 * 2. Required top-level fields (name, description, plugins array)
 * 3. Each plugin has required fields (id, name, description, author, repo)
 * 4. No duplicate plugin IDs
 * 5. GitHub repo URLs are properly formatted
 * 6. No empty/whitespace-only strings
 */

const fs = require('fs');
const path = require('path');

const MARKETPLACE_PATH = path.join(__dirname, '..', '.claude-plugin', 'marketplace.json');

const REQUIRED_PLUGIN_FIELDS = ['id', 'name', 'description', 'author', 'repo'];
const OPTIONAL_PLUGIN_FIELDS = ['category', 'stars', 'tags', 'installCmd', 'submittedAt', 'version'];

let errors = [];
let warnings = [];

function error(msg) {
    errors.push(`❌ ${msg}`);
}

function warn(msg) {
    warnings.push(`⚠️  ${msg}`);
}

function success(msg) {
    console.log(`✅ ${msg}`);
}

// 1. Check file exists
if (!fs.existsSync(MARKETPLACE_PATH)) {
    error('marketplace.json not found at .claude-plugin/marketplace.json');
    process.exit(1);
}

// 2. Parse JSON
let data;
try {
    const raw = fs.readFileSync(MARKETPLACE_PATH, 'utf-8');
    data = JSON.parse(raw);
    success('Valid JSON syntax');
} catch (e) {
    error(`Invalid JSON: ${e.message}`);
    printResults();
    process.exit(1);
}

// 3. Check top-level structure
if (!data.name || typeof data.name !== 'string') {
    error('Missing or invalid top-level "name" field');
}
if (!data.description || typeof data.description !== 'string') {
    error('Missing or invalid top-level "description" field');
}
if (!Array.isArray(data.plugins)) {
    error('"plugins" must be an array');
    printResults();
    process.exit(1);
}
success(`Found ${data.plugins.length} plugin(s)`);

// 4. Validate each plugin
const seenIds = new Set();
const seenNames = new Set();

data.plugins.forEach((plugin, index) => {
    const prefix = `Plugin #${index + 1}`;

    // Check required fields
    for (const field of REQUIRED_PLUGIN_FIELDS) {
        if (!plugin[field]) {
            error(`${prefix}: Missing required field "${field}"`);
        } else if (typeof plugin[field] === 'string' && plugin[field].trim() === '') {
            error(`${prefix}: Field "${field}" cannot be empty`);
        }
    }

    // Check for duplicate IDs
    if (plugin.id) {
        if (seenIds.has(plugin.id)) {
            error(`${prefix}: Duplicate plugin ID "${plugin.id}"`);
        }
        seenIds.add(plugin.id);
    }

    // Check for duplicate names
    if (plugin.name) {
        const lowerName = plugin.name.toLowerCase();
        if (seenNames.has(lowerName)) {
            warn(`${prefix}: Duplicate plugin name "${plugin.name}"`);
        }
        seenNames.add(lowerName);
    }

    // Validate repo format (owner/repo)
    if (plugin.repo) {
        const repoPattern = /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/;
        if (!repoPattern.test(plugin.repo)) {
            error(`${prefix}: Invalid repo format "${plugin.repo}" — expected "owner/repo"`);
        }
    }

    // Validate tags is an array of strings
    if (plugin.tags && !Array.isArray(plugin.tags)) {
        error(`${prefix}: "tags" must be an array`);
    }

    // Validate description length
    if (plugin.description && plugin.description.length > 500) {
        warn(`${prefix}: Description is very long (${plugin.description.length} chars)`);
    }

    // Check for unknown fields
    const allKnownFields = [...REQUIRED_PLUGIN_FIELDS, ...OPTIONAL_PLUGIN_FIELDS];
    Object.keys(plugin).forEach(key => {
        if (!allKnownFields.includes(key)) {
            warn(`${prefix}: Unknown field "${key}"`);
        }
    });
});

// 5. Print results
printResults();

function printResults() {
    console.log('\n--- Validation Results ---');

    if (warnings.length > 0) {
        console.log('\nWarnings:');
        warnings.forEach(w => console.log(w));
    }

    if (errors.length > 0) {
        console.log('\nErrors:');
        errors.forEach(e => console.log(e));
        console.log(`\n❌ Validation FAILED with ${errors.length} error(s)`);
        process.exit(1);
    } else {
        console.log(`\n✅ Validation PASSED — ${data.plugins.length} plugin(s), 0 errors`);
        process.exit(0);
    }
}
