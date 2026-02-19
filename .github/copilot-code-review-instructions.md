# Copilot Code Review Instructions for Plugin Submissions

When reviewing PRs that modify `.claude-plugin/marketplace.json`, please verify the following:

## Required Field Validation

Each plugin entry in the `plugins` array **must** have all 8 required fields:
- `id` - Unique identifier for the plugin
- `name` - Display name of the plugin
- `description` - Description of the plugin's functionality
- `author` - GitHub username of the author
- `repo` - Repository location in `owner/repo` format
- `category` - Category classification
- `tags` - Array of relevant keywords
- `installCmd` - Installation command string

## Field Format Validation

### `id` field
- Must be lowercase
- Must use hyphens for word separation (no spaces or special characters except hyphens)
- Examples of valid IDs: `example-plugin`, `mcp-server-tools`, `ai-assistant`
- Examples of invalid IDs: `Example Plugin`, `example_plugin`, `example.plugin`

### `repo` field
- Must be in `owner/repo` format (contains exactly one `/`)
- Must reference a valid GitHub repository format
- Example: `username/example-plugin`

### `description` field
- Must be meaningful and descriptive (not empty or placeholder text)
- Should explain what the plugin does
- Avoid generic placeholders like "TODO", "Test", "Example", "Lorem ipsum"

### `tags` field
- Must be an array with at least one tag
- Tags should be relevant to the plugin's functionality
- Tags should not be spam or unrelated keywords
- Avoid generic or meaningless tags

### `installCmd` field
- Must look like a valid installation command
- Typical formats: `/plugin add owner/repo`, `npm install package`, `pip install package`
- Should not contain suspicious or malicious commands

### `category` field
- Should be a reasonable category string
- Typical categories: Tool, Integration, Framework, Language, AI, Data
- Should accurately represent the plugin type

## Duplicate Detection

- Check that the new plugin's `id` is unique and doesn't already exist in the `plugins` array
- Each plugin must have a distinct `id` value

## Security Review

Flag any suspicious or potentially malicious content:
- Script injection attempts in any field (e.g., `<script>`, `eval()`, shell commands)
- Unexpected URLs or links in fields other than `repo`
- Obfuscated or encoded content that could hide malicious behavior
- Install commands that attempt to execute arbitrary code beyond normal installation
- Social engineering attempts in descriptions or names
- Attempts to impersonate official plugins or services

## JSON Structure Validation

- Ensure the overall JSON structure remains valid
- Verify proper formatting (consistent indentation, matching brackets)
- Check that the `plugins` array syntax is correct
- Ensure no syntax errors are introduced

## Review Outcome

If **any** of the above validation rules fail or raise concerns:
- Leave specific review comments on the problematic lines
- Explain what needs to be fixed
- Suggest corrections where applicable

Your review helps maintain the quality and security of the plugin registry. Thank you!

