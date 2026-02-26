# Client Health Dashboard - L'Atelier de l'Automatisation

## Purpose
CLI tool that calculates a health score per client (based on payment delays, invoice frequency, priority) and displays a colored terminal table. Designed as a quick diagnostic dashboard for account managers.

## Tech
- Node.js, zero external dependencies
- ANSI escape codes for terminal colors
- Scoring algorithm with configurable weights and thresholds

## How to run
```bash
node src/dashboard.js
```

## Available data
7 clients from an Airtable snapshot stored locally in `src/clients.js`. This is a static export — for live data, use the MCP Airtable connection.

## MCP
Airtable is connected via MCP tools:
- **Base**: `appUxa9p0fQwPhQOd` (Atelier Automatisations)
- **Table**: `tblOsQdltpPG8Jxcd` (Clients)

## TODO
- `--priority=haute` flag not yet implemented (filter clients by high priority)

## Project structure
| File | Description |
|------|-------------|
| `CLAUDE.md` | This context file for Claude Code |
| `package.json` | Project metadata and npm scripts |
| `src/config.js` | ANSI color codes, scoring weights, thresholds, health labels |
| `src/clients.js` | Static Airtable snapshot of 7 clients with business metrics |
| `src/dashboard.js` | Main script — scoring engine, progress bar renderer, table display |
