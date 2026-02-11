# Contributing to Claude Plugins Registry

Thank you for contributing to the community! This guide will help you submit your plugin properly.

---

## Submission Process

### 1. Fork the Repository

Click the "Fork" button in the top-right corner of this repository.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/claude-plugins-registry.git
cd claude-plugins-registry
```

### 3. Create a New Branch

```bash
git checkout -b add-my-plugin
```

### 4. Add Your Plugin to marketplace.json

Open `.claude-plugin/marketplace.json` and add your plugin to the `plugins` array:

```json
{
  "name": "your-plugin-name",
  "source": {
    "source": "github",
    "repo": "your-github-username/your-plugin-repo"
  },
  "description": "A concise description of what your plugin does (max 200 chars).",
  "category": "Tool",
  "tags": ["productivity", "utility", "awesome"]
}
```

**Important:**
- Add your plugin entry inside the `plugins` array
- Ensure proper JSON syntax (no trailing commas!)
- Place a comma after the previous plugin entry
- Keep the structure clean and formatted

### 5. Validate Your Changes Locally

```bash
# Check JSON syntax
cat .claude-plugin/marketplace.json | jq empty

# Run validation script
node scripts/validate.js
```

### 6. Commit and Push

```bash
git add .claude-plugin/marketplace.json
git commit -m "Add [your-plugin-name] plugin"
git push origin add-my-plugin
```

### 7. Submit a Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Provide a clear description of your plugin
4. Submit the PR

Our automated checks will validate your submission. If there are any issues, you'll see them in the PR checks.

---

## Plugin Requirements

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Unique plugin identifier (lowercase, hyphens only) |
| `source` | object | Where the plugin code lives |
| `description` | string | What your plugin does (50-200 characters) |
| `category` | string | One of: Tool, Integration, Framework, Language, AI, Data |
| `tags` | array | 1-5 relevant keywords (lowercase) |

### Source Formats

#### GitHub (Recommended)
```json
"source": {
  "source": "github",
  "repo": "username/repository"
}
```

#### Direct URL
```json
"source": {
  "source": "url",
  "url": "https://example.com/plugin.zip"
}
```

---

## Plugin Repository Requirements

Your plugin repository **must**:

1. Be **public** (private repos cannot be installed)
2. Include a `README.md` with installation/usage instructions
3. Have a valid `package.json` or equivalent manifest
4. Include a license file
5. Be actively maintained (respond to issues)
6. Follow Claude Code plugin structure

---

## What We Don't Accept

- Malicious or harmful plugins
- Plugins violating third-party terms of service
- Duplicate functionality (check existing plugins first)
- Private or inaccessible repositories
- Abandoned or unmaintained code
- Plugins without proper documentation

---

## Category Guidelines

Choose the category that best fits your plugin:

- **Tool**: General utilities, formatters, linters, productivity tools
- **Integration**: APIs, databases, cloud services, external platforms
- **Framework**: Code generators, scaffolding tools, boilerplates
- **Language**: Language-specific tools (Python, JavaScript, etc.)
- **AI**: Machine learning, AI assistants, model integrations
- **Data**: Data analysis, visualization, processing pipelines

---

## Tagging Best Practices

- Use 1-5 tags maximum
- Keep tags lowercase
- Use hyphens for multi-word tags (e.g., `machine-learning`)
- Be specific but discoverable
- Examples: `git`, `testing`, `api`, `cloud`, `security`

---

## Review Process

1. **Automated Checks** (immediate)
   - JSON syntax validation
   - Schema compliance
   - Repository accessibility

2. **Manual Review** (1-3 days)
   - Code quality check
   - Documentation review
   - Security scan
   - Community fit

3. **Approval & Merge**
   - Once approved, your PR will be merged
   - Your plugin will be available within minutes

---

## After Your Plugin is Merged

1. **Update your plugin's README** to mention it's available on claudeplugins.dev
2. **Add the badge** to your repository:
   ```markdown
   [![Available on claudeplugins.dev](https://img.shields.io/badge/claudeplugins.dev-available-blue)](https://claudeplugins.dev)
   ```
3. **Share it!** Tweet, blog, tell your friends
4. **Keep it updated** - push improvements and bug fixes

---

## Need Help?

- Check existing PRs for examples
- Ask questions in your PR comments
- Join discussions: [GitHub Discussions](https://github.com/Kajdep/claude-plugins-registry/discussions)
- Email: support@claudeplugins.dev

---

**Thank you for making the Claude ecosystem better!**
