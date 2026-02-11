# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a community-driven plugin registry for Claude Code. The core data lives in a single JSON file (`.claude-plugin/marketplace.json`) that serves as the plugin database. A validation script and CI workflow enforce schema compliance on all changes.

## Key Commands

```bash
# Validate marketplace.json (the main development task)
node scripts/validate.js

# Quick JSON syntax check (requires jq)
cat .claude-plugin/marketplace.json | jq empty
```

No build step, no dependencies to install. Node.js 20+ is the only prerequisite.

## Architecture

- **`.claude-plugin/marketplace.json`** — The entire plugin database. Top-level requires `name`, `description`, and `plugins` array. This is the only file contributors typically modify.
- **`scripts/validate.js`** — Node.js validation script (no external dependencies). Checks JSON syntax, required top-level fields, and per-plugin field requirements.
- **`.github/workflows/validate.yml`** — Runs on PRs and pushes to `main` that touch `marketplace.json`. Runs `jq empty` then `node scripts/validate.js`.

## Plugin Schema

Each entry in the `plugins` array requires these fields:

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | Unique identifier |
| `name` | string | Display name |
| `description` | string | 50-200 characters |
| `author` | string | GitHub username |
| `repo` | string | Format: `username/repository` (must contain `/`) |
| `category` | string | One of: Tool, Integration, Framework, Language, AI, Data |
| `tags` | array | 1-5 lowercase keywords |
| `installCmd` | string | CLI install command |

Optional: `stars` (number).

## Validation Rules

The validator (`scripts/validate.js`) enforces:
- Valid JSON syntax
- Top-level `name`, `description`, `plugins` fields exist
- `plugins` is an array
- Each plugin has all 8 required fields with correct types
- `repo` field contains a `/` separator
- `tags` is a non-empty array (empty triggers warning, not failure)

## Contribution Pattern

All contributions modify `.claude-plugin/marketplace.json` by appending to the `plugins` array. Run `node scripts/validate.js` locally before committing. The CI workflow will run the same validation on PRs.
