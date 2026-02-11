# Claude Plugins Registry

[![Validate Schema](https://github.com/Kajdep/claude-plugins-registry/actions/workflows/validate.yml/badge.svg)](https://github.com/Kajdep/claude-plugins-registry/actions/workflows/validate.yml)

The premier community-driven marketplace for **Claude Code plugins**, MCP servers, and skills. Browse, discover, and install plugins directly from the command line.

> **Note:** This project is not affiliated with Anthropic PBC.

## Web Interface

Visit **[claudeplugins.dev](https://claudeplugins.dev)** to browse plugins visually with search, filters, and detailed documentation.

---

## Installation

Add this marketplace to your Claude Code CLI:

```bash
/plugin marketplace add Kajdep/claude-plugins-registry
```

---

## Installing Plugins

Once the marketplace is added, install any plugin from the registry:

```bash
/plugin install plugin-name
```

List all available plugins:

```bash
/plugin marketplace list
```

---

## Repository Structure

```
.
├── .claude-plugin/
│   └── marketplace.json      # Plugin database (Claude CLI compatible)
├── .github/
│   └── workflows/
│       └── validate.yml      # Automated validation on PRs
├── scripts/
│   └── validate.js           # Schema validation script
├── README.md                 # This file
├── CONTRIBUTING.md           # How to submit plugins
└── LICENSE                   # MIT License
```

---

## Contributing

We welcome plugin submissions! See **[CONTRIBUTING.md](CONTRIBUTING.md)** for detailed instructions.

**Quick overview:**
1. Fork this repository
2. Add your plugin to `.claude-plugin/marketplace.json`
3. Ensure your plugin repository is public and properly structured
4. Submit a Pull Request
5. Automated checks will validate your submission

---

## Plugin Categories

- **Tool**: Utilities and productivity enhancers
- **Integration**: Third-party service connectors
- **Framework**: Development frameworks and scaffolds
- **Language**: Language-specific tooling
- **AI**: AI/ML related plugins
- **Data**: Data processing and analysis tools

---

## Local Development

### Validate the marketplace file locally:

```bash
# Check JSON syntax
cat .claude-plugin/marketplace.json | jq empty

# Run full validation
node scripts/validate.js
```

### Prerequisites:
- Node.js 20+ (for validation script)
- `jq` (for JSON syntax checking)

---

## Schema Compliance

This repository strictly follows the [Anthropic Claude Code Marketplace Schema](https://anthropic.com/claude-code/marketplace.schema.json).

Key requirements:
- `$schema` must reference the official schema URL
- `owner` must be an **object** (not a string)
- Each plugin must specify a valid `source` object
- Plugins must include: `name`, `description`, `category`, and `source`

---

## Security

We run automated checks on all submissions:
- JSON syntax validation
- Schema compliance verification
- Source repository accessibility
- No malicious patterns

Report security concerns to: **support@claudeplugins.dev**

---

## License

This registry is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

Individual plugins are licensed by their respective authors.

---

## Support

- Website: [claudeplugins.dev](https://claudeplugins.dev)
- Email: support@claudeplugins.dev
- Discussions: [GitHub Discussions](https://github.com/Kajdep/claude-plugins-registry/discussions)
- Issues: [GitHub Issues](https://github.com/Kajdep/claude-plugins-registry/issues)

---

**Built with care by the Claude community**
