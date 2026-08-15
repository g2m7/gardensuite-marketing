# GardenSuite

GardenSuite is tea garden management software built and maintained by Sarbani Associates.

## Repository map

- `gs_landing/` - SvelteKit website and deployed static files
- `docs/` - Product, website, pricing, SEO, and implementation documentation
- `marketing/outreach/` - Current outreach authority and implementation plan
- `marketing/archive/` - Retired campaign documentation and tools
- `assets/` - Brand files, source media, design system, and visual references
- `collateral/` - Source files used to build brochures and sales material
- `scripts/` - Reusable generators, checks, and maintenance tools
- `deliverables/` - Local generated documents and client output; ignored by Git
- `.artifacts/` - Local screenshots, previews, and temporary renders; ignored by Git

## Website development

```sh
cd gs_landing
bun install
bun run dev
```

Before changing copy, design, SEO, UX, or outreach, read `AGENTS.md` and the relevant documentation it identifies.

## File placement rules

- Keep deployable website code and served assets inside `gs_landing/`.
- Keep reusable source material in `assets/`, `collateral/`, or `scripts/`.
- Put generated PDFs, workbooks, client documents, and exports in `deliverables/`.
- Put review screenshots, browser logs, and temporary renders in `.artifacts/`.
- Do not add new output folders at the repository root.

`bun run check` from `gs_landing/` verifies both the application and the repository layout.
