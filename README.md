# Mission & Method

Static development preview of a guided learning platform and independent software catalogue.

## Run

Requires Node 22 or newer. No npm dependencies are needed.

```sh
node scripts/preview.mjs
# http://127.0.0.1:4187
node --test tests/*.test.mjs
node scripts/check-links.mjs
node build.mjs
```

`node scripts/generate-pages.mjs` regenerates the catalogue, module entry pages, product pages, resource library and shared page shells. Edit teaching content in `course-data.js`, product configuration in `products.js`, and generated page templates in the generator. Home and founder visual layouts remain in their HTML/CSS sources.

Learning starts at `planning-system.html`. `learn.html` renders 45 numbered lessons and reviews. `organisation.html` assembles saved course outputs, exports Markdown and prints to PDF. The work-plan lesson includes dated tasks and a responsive Gantt view. Course backups can be imported with validation and explicit replacement confirmation.

Each `software-*.html` page has a separate browser data namespace. Course answers are not imported into software. The common account page does not invent an identity or entitlement.

## Paid access is not live

Do not put paid Excel files or secrets in this public repository. Full lessons are currently public development-preview assets, not paywalled course content. `server/entitlements.mjs` contains tested access policy logic but requires a trusted server, billing events and authenticated identity before production use. Follow [the production access plan](docs/production-access.md).

See [the audit](docs/audit.md) for changes and limits. No API keys or payment credentials belong in frontend code.
