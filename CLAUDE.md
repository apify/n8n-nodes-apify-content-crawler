# CLAUDE.md

## Project Purpose

This repository provides a community n8n node package (`@apify/n8n-nodes-apify-content-crawler`) that integrates Apify's Website Content Crawler into n8n workflows. It allows users to crawl websites and extract text content for use in AI agents, LLM applications, vector databases, and RAG pipelines.

## Repository Structure

```
nodes/ApifyContentCrawler/   Main node implementation
  ApifyContentCrawler.node.ts  Node entry point
  helpers/                     Constants and utility helpers
  resources/                   Node properties and routing logic
  __tests__/                   Jest tests
credentials/                 n8n credential definitions (API key + OAuth2)
docs/                        Documentation assets
icons/                       Node icons
.github/workflows/
  ci.yml                     Lint, type-check, build, test on push/PR to master
  publish.yml                Build, test, and publish to npm on GitHub release
  claude-md-maintenance.yml  Auto-updates this file via Claude on push to master
```

## Technology Stack

- **Language:** TypeScript (compiled via `n8n-node build` / `tsc`)
- **Runtime:** Node.js >=18.10 (CI uses 22.x)
- **Package manager:** npm 10.8.2 (`npm ci` for installs)
- **Framework:** n8n community node API (`n8n-workflow` peer dependency)
- **Testing:** Jest + ts-jest
- **Linting:** ESLint via `@n8n/node-cli`

## Build, Test & Run

```bash
npm ci                # Install dependencies
npm run build         # Compile TypeScript to dist/
npm run lint          # Lint
npm run lint:fix      # Lint with auto-fix
npx tsc --noEmit      # Type-check without emitting
npm test              # Run Jest tests (sets WEBHOOK_URL=https://localhost:5678)
npm run dev           # Development mode
```

Tests live in `nodes/ApifyContentCrawler/__tests__/` and `credentials/` subdirectories, matching `**/__tests__/**/?(*.)+(spec).ts`.

## Conventions

- **Branch:** `master` is the main branch; CI runs on push and PRs targeting `master`.
- **Releases:** Triggered by publishing a GitHub Release with a `v*` tag. The publish workflow updates `package.json` version and pushes a `chore(release): set version to X.Y.Z [skip ci]` commit, then publishes to npm using trusted publishing.
- **Commit style:** Conventional commits (e.g., `fix:`, `ci:`, `chore(release):`).
- **Published artifact:** Only the `dist/` directory is included in the npm package.

## Key Notes for AI Assistants

- The `CLAUDE.md` maintenance workflow (`claude-md-maintenance.yml`) runs automatically on every push to `master` via the reusable workflow at `apify/workflows`. Do not remove or break this workflow.
- The node is published to npm as `@apify/n8n-nodes-apify-content-crawler`; version bumps happen automatically via the publish workflow — do not manually edit the version in `package.json` unless there is a specific reason.
- `n8n-workflow` is a peer dependency and must not be added to `dependencies` or `devDependencies`.
- The node supports both API key and OAuth2 authentication; both credential files must be kept in sync with the `package.json` `n8n.credentials` array.
