# GardenSuite Frontend - Agent Rules

You are working in the SvelteKit app. This file is the entry point for all frontend work.

## Read Before Writing Any Code

1. `../docs/website/DESIGN.md` - the design system. Tokens, type scale, spacing, shadows, component patterns. Extracted from the live homepage, matches `src/routes/layout.css`.
2. `../AGENTS.md` - SEO rules, performance rules, copy safety rules, new page checklist.
3. `docs/landing-page/styling.md` and `docs/landing-page/typography.md` - homepage visual direction and locked type system.

If a generic design skill (for example `frontend-design-ultimate`, `ui-ux-pro-max`, `landing-page`) conflicts with these docs, these docs win. This project bans: `font-bold`, `backdrop-blur`, colored shadows, `shadow-lg`/`shadow-xl`/`shadow-2xl`, pill-shaped kickers, background boxes behind icons, em dashes, and any color not in the token list.

## Where the Tokens Live

`src/routes/layout.css` is the only stylesheet. It defines the `@theme` color tokens, radius scale, fonts, and shadow utilities (`shadow-card`, `shadow-soft`, `shadow-card-hover`). There is no `app.css` and no `tailwind.config` - Tailwind v4 is configured CSS-first.

- Use token classes (`text-green-deep`, `border-border`, `shadow-soft`), never hardcoded hex.
- Use the shadow utilities, never arbitrary `shadow-[...]` values.
- Use the radius scale (`rounded-sm/md/lg/xl`), never arbitrary `rounded-[...]` values.
- Use the type scale in DESIGN.md, never new arbitrary `text-[...]` sizes.

## Component Inventory (use these, do not rebuild)

`src/lib/components/`:

- `Button.svelte`, `ButtonGroup.svelte` - the only button implementation. Use for all CTAs.
- `GlobalNav.svelte`, `Footer.svelte` - site chrome, already in `+layout.svelte`.
- `LegalPage.svelte` - shell for /privacy, /terms.
- `Breadcrumbs.svelte` (in `product/`) - breadcrumb nav, required on new pages.
- `FaqSection.svelte` - FAQ accordion.
- `article/ArticleLayout.svelte` - shell for guide articles. Wires SEO head, schema, breadcrumbs. All guide pages must use it.
- `article/MediaPlaceholder.svelte` - image placeholder for guides.
- Product page building blocks (in `product/`): `ProductHero`, `ProductProblemStrip`, `SolutionWorkflowSection`, `ProductRollout`, `ProductCta`, `ProductTrustRow`, `ProductActions`, `ProductCardFrame`, `ComparisonTable`, `WageLeakageCalculator`.

Route-level components live beside their routes (for example `products/attendance/*.svelte`). Do not import from one route into another route.

## New Page Workflow

1. Decide the page type:
   - Guide/article: copy `ArticleLayout` usage from any page under `routes/guides/`.
   - Product page: follow the formula Hero - Problem - Workflow - Result - Rollout - CTA using the `product/` components. See `products/payroll/` or `products/mis/` for shape.
   - Location page: see `routes/tea-garden-software-assam/`.
2. Compose from the component inventory above. Do not hand-roll sections that a component already covers.
3. Match the kicker exactly: `text-[13px] font-semibold tracking-[0.08em] uppercase` with `text-green-deep`. No pill backgrounds.
4. Complete the checklists in `../AGENTS.md`: SEO (10 items), performance (8 items), copy safety (7 items), new page (10 items).
5. Add the route to `src/routes/sitemap.xml/+server.ts`.
6. Run `bun run check` and `bun run lint` in this directory. Both must pass.

## Known Debt (do not copy these patterns)

Some existing pages violate the rules above (hand-rolled sections, hardcoded hex, arbitrary shadows). They predate the ratchet check in `scripts/check_design_rules.mjs` at the repo root, which holds them at their current violation count. When editing one of those files, do not add new violations, and remove existing ones where you touch them.
