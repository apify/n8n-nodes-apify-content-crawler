# AGENTS.md

Guidance for AI agents and contributors working in this repository. This is the single
instruction doc — `CLAUDE.md` is only a `@AGENTS.md` pointer, so put instructions here and
leave the pointer alone. `.github/workflows/agents-md-maintenance.yml` keeps this file in
sync on every non-draft PR.

## Project

`@apify/n8n-nodes-apify-content-crawler` — n8n community node package wrapping one Apify Actor,
[Website Content Crawler](https://apify.com/apify/website-content-crawler) (Actor ID
`aYG0l9s7dbB7j3gbS`), for crawling sites into text/markdown for AI agents and RAG pipelines.
Ships one node (`apifyContentCrawler`, "Website Content Crawler by Apify", `usableAsTool: true`)
and two credential types: `apifyApi` (API key) and `apifyOAuth2Api` (PKCE OAuth2; the README
says n8n cloud only). The general-purpose Apify node lives in the sibling repo
`apify/n8n-nodes-apify`; this one is a deliberately small, single-Actor variant.

## Commands

```bash
npm ci                 # npm (packageManager npm@10.8.2); don't switch package managers
npm run build          # n8n-node build -> dist/
npm run dev            # n8n-node dev: local n8n with this node linked
npm run lint           # n8n-node lint (ESLint 9, @n8n/node-cli config); lint:fix to autofix
npx tsc --noEmit       # type check — same as CI
npm test               # jest; sets WEBHOOK_URL=https://localhost:5678
```

Single test: `npx jest -t '<test name>'`. CI (`ci.yml`) runs `npm ci` → lint → `tsc --noEmit` →
build → test on Node 22.x for pushes and PRs to `master`. `package.json` engines still say
`>=18.10`.

## Architecture

The whole node is ~700 lines of non-test TypeScript under `nodes/ApifyContentCrawler/`.

### Node → resource → operation

`ApifyContentCrawler.node.ts` holds the description and an `execute` loop that calls
`router` per input item, stamps `pairedItem`, and honours `continueOnFail()`. Properties,
the (empty) `methods` object, and `router` come from `resources/resources.ts`, which assembles:
an `authentication` select (`apifyApi` / `apifyOAuth2Api`), a single-option `resource` select,
the `operation` select, then each operation's properties.

Operations live in `resources/properties/`, each exporting `option`, `properties`, `execute`:

- `scrapeSingle.ts` — **Scrape URL**: one `startUrl`, `crawlerType`, and hard-coded
  `maxCrawlDepth: 1`, `maxCrawlPages: 1`.
- `scrapeMultiple.ts` — **Crawl website**: `entries` fixedCollection of start URLs, plus
  `sitemapUrlsEnabled` (sent as `useSitemaps`), `crawlerType`, `maxDepth` → `maxCrawlDepth`,
  `maxPages` → `maxCrawlPages`. n8n parameter names differ from the Actor input keys — map
  them in `execute`.

Resource and operation **values** are the display strings `'Website Content Crawler'`,
`'Scrape URL'`, `'Crawl website'`; they're used verbatim in every `displayOptions.show` and in
the `router` switch, and saved workflows store them. Never rename them. To add an operation,
add a file in `resources/properties/`, add its `option` and `properties` in `resources.ts`, and
add a `case` to `router`.

### Run flow — `helpers/genericFunctions.ts`, `helpers/executeActor.ts`

Both operations call `executeActorRun(ACTOR_ID, actorInput)`:

1. `GET /v2/acts/{id}/builds/default` and collect every input property's **`prefill`** from
   the build's input schema as the base input (`getDefaultInputsFromBuild`). The node only
   exposes a few fields, so the Actor's prefills supply everything else.
2. Shallow-merge the node's input on top, `POST /v2/acts/{id}/runs` with `waitForFinish: 0`.
3. `pollRunStatus` polls `GET /v2/actor-runs/{runId}` every 1s until a status in
   `TERMINAL_RUN_STATUSES`. It has **no timeout** — a long crawl blocks the n8n execution.
4. Fetch `GET /v2/datasets/{defaultDatasetId}/items` and return them as items. The final run
   status is **not checked**: a `FAILED`/`ABORTED`/`TIMED-OUT` run returns whatever reached the
   dataset (possibly nothing) without an error.

`apiRequest` is the only HTTP path: it prefixes `APIFY_API_URL`, sets `json: true`, adds the
`x-apify-integration-platform: n8n` and `x-apify-integration-app-id: website-content-crawler-app`
headers, reads the `authentication` parameter to pick the credential, and wraps failures in
`NodeApiError`. There are no retries or request timeouts.

### AI tool mode

n8n clones a `usableAsTool` node into a `…apifyContentCrawlerTool` type; `isUsedAsAiTool`
detects that suffix. In tool mode `apiRequest` adds `x-apify-integration-ai-tool: true` and
`getResults` reduces each dataset item to `{ markdown }` only — keep that lean contract when
changing the result shape.

### Credentials — `credentials/`

`ApifyApi` sends `Authorization: Bearer {{apiKey}}` and tests against `${APIFY_API_URL}/v2/me`
(it imports `APIFY_API_URL` from `helpers/consts.ts`). `ApifyOAuth2Api` extends `oAuth2Api`
with hidden PKCE fields (Apify console authorize URL, `console-backend` token URL, scopes
`profile full_api_access`). Both files must stay listed in `package.json` `n8n.credentials`
(as `dist/…js` paths), and the node's `credentials` entries key off the `authentication` value.

### Tests — `nodes/ApifyContentCrawler/__tests__/`

There is one spec (`Apify.node.spec.ts`); nothing exists under `credentials/` even though the
Jest roots include it. The harness (`utils/executeWorkflow.ts`) does **not** run n8n's workflow
engine or `nock`: it takes the first node of an exported workflow JSON
(`workflows/actors/*.workflow.json`), calls `execute` with a hand-rolled `IExecuteFunctions`,
and answers `httpRequestWithAuthentication` by URL substring from `utils/fixtures.ts`
(`/builds/default`, `/runs`, `/actor-runs/`, an unused `/actors/`, `/datasets/`; anything else
throws). Consequences:

- The stub's `getNodeParameter` returns `node.parameters[name]` and ignores the item index and
  the caller's default, so any parameter missing from the fixture is `undefined` in tests (the
  current fixture sets only `resource`, `operation`, `entries`).
- `CredentialsHelper` always returns the `apifyApi` test credentials regardless of the
  requested name, and no request options or headers are asserted — tests check only the
  returned dataset item.
- A new endpoint needs a new branch in the stub, ordered so substrings don't shadow each other.

## Conventions and gotchas

- `resources/properties/*.ts` import `ACTOR_ID` from `ApifyContentCrawler.node.ts`, which
  imports `resources/resources.ts`, which imports them — a circular import that works only
  because `ACTOR_ID` is read inside `execute`. Don't use it at module load time; for new code
  import `WEB_CONTENT_SCRAPER_ACTOR_ID` from `helpers/consts.ts` instead.
- `crawlerType` is declared twice (once per operation) with identical options; change both.
- `router` reads `resource` with item index `0` but `operation` per item.
- The comment above `version: [1]` about a "mismatched version" hack is stale — version and
  `defaultVersion` are both `1`.
- ESLint ignores `__tests__/**` and `tsconfig.json` excludes `nodes/ApifyContentCrawler/__tests__`,
  so `npm run lint` and `tsc --noEmit` don't check test code; only `ts-jest` compiles it.
- Leftovers that do nothing: `npm run merge:api` (no `openapi.config.json` in the repo),
  `gulpfile.js` (not called by `n8n-node build`), `tslint.json`.
- `package.json#main` points at a non-existent `index.js`; n8n loads the `dist/` paths under the
  `n8n` field, and only `dist/` is published (`files`). Never commit `dist/`.
- `n8n-workflow` is a peer dependency only — don't add it to `dependencies`/`devDependencies`.
- Keep base URLs and Actor IDs in `helpers/consts.ts`.
- Conventional Commits (`feat:`, `fix:`, `chore:`, `ci:`, `docs:`); PRs target `master`.
- Never bump the version by hand. Publishing a GitHub Release tagged `vX.Y.Z` triggers
  `publish.yml`: upgrade to npm ≥11.5.1 (needed for npm trusted publishing), build, test,
  `npm version`, a `chore(release): set version to X.Y.Z [skip ci]` commit by Apify Release Bot
  pushed to the release's target branch, then `npm publish --access public` (skipped if that
  version is already on npm).
