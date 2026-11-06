# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static product hub: one home page listing all of the owner's apps, plus per-app landing pages and policy pages. Astro 7 + Tailwind CSS 4, output is fully static, deployed to Cloudflare Pages (build `pnpm build`, output `dist/`, no adapter).

## Commands

```bash
pnpm dev       # dev server on http://localhost:4321
pnpm build     # static build to dist/
pnpm check     # astro check (type-check .astro/.ts) — the only automated check; there are no tests or linter
pnpm preview   # serve dist/
```

Toolchain constraints (both hit during setup):
- Astro 7 requires Node **>= 22.23.4** (machine uses nvm-windows: `nvm use 22.23.4`).
- TypeScript is pinned to **6.x** because `astro check` does not support TS 7.

## Architecture

### Content-driven pages
Apps are data, not code. `src/content.config.ts` defines two collections (Zod schemas, `astro/zod` — Zod 4, so use `z.url()` not `z.string().url()`):

- **`products`** — one JSON file per app in `src/content/products/<slug>.json`; the file name is the URL slug. Landing sections (`hero`, `features`, `pricing`, `faqs`) are optional and only render when present.
- **`policies`** — Markdown at `src/content/policies/<slug>/<doc>.md`, where `<doc>` must be a key of `POLICY_DOCS` in `src/config.ts` (`privacy`, `terms`, `refund`, `delete-data`).

`src/lib/content.ts` holds the shared queries (`getProducts`, `getPolicyIndex`, `parsePolicyId`, href helpers).

### Routes
- `src/pages/index.astro` — home: hero, product grid with client-side platform filter (`PLATFORM_FILTERS` / `DESKTOP_PLATFORMS` in `src/config.ts`; `groupsFor()` also maps `Android*` → Android and `*extension*` → Desktop), contact modal, social footer.
- `src/pages/[product]/index.astro` — generic landing generated for every product **except** those with `customPage: true`.
- `src/pages/[product]/[doc].astro` — generic policy page, generated from the `policies` collection; TOC comes from the Markdown h2 headings, a Contact section is appended automatically.

Home card behavior is driven by product fields: `url` set → whole card links to that external site in a new tab (↗); otherwise → internal `/<slug>/` (→). `icon` replaces the `mono` letter tile.

### Two styling systems — keep them separate
1. **Hub style** (home + generic pages): `src/layouts/BaseLayout.astro` imports `src/styles/global.css` (Tailwind 4 `@theme` tokens: `ink`, `paper`, `line`, `muted`, `accent`… fonts Space Grotesk + Inter). Per-app color comes from the product's `accent`, injected as `--color-accent` on `<body>`. Shared UI lives in `src/components/` (`Button` renders `<a>` with `href`, else `<button>`; `Icon` is an inline-SVG registry — add paths there).
2. **App-owned design** (currently `src/pages/snow-screen/` and `src/pages/audio-alive/`): a hand-ported copy of the app's own website. It must **not** use `BaseLayout`/Tailwind; it has its own layout, CSS and scripts in `_`-prefixed files and a `_design.md` describing its design system. Its product JSON sets `customPage: true` so the generic route does not collide with `/snow-screen/`.

When adding another app with its own design, follow the snow-screen pattern. Every such app must link back to the hub: put `<HubBar />` (`src/components/HubBar.astro`, slim "← All apps" strip) at the top of its layout container and `<MoreApps current="<slug>" />` (cross-promo grid of the other products) at the end of its landing `<main>`, plus an "All apps" footer link. Both components use plain scoped CSS themed by `--hub-*` variables (`--hub-fg`, `--hub-hover`, `--hub-border`, `--hub-card`, `--hub-title`, `--hub-tile`, `--hub-tile-fg`) that the app's stylesheet sets on `:root`. Files in `src/pages/` that are not routes must start with `_` — a plain `design.md` there would be published as a page.

### Markdown
Astro 7's default Markdown processor is not unified/remark, so `markdown.rehypePlugins` fails without installing `@astrojs/markdown-remark`. Policy prose is styled with plain CSS (`.policy-prose` in `global.css`) instead of plugins.

## Content conventions

- Site-wide settings (contact email, hero copy, socials) are in `src/config.ts`.
- `[PLACEHOLDER]` strings in content files are intentional gaps waiting for real copy — don't invent replacement facts.
- App icons go in `public/icons/`; ship a small (~128px) copy for UI use alongside the original (generate with Astro's bundled sharp under `node_modules/.pnpm/sharp@*/`).
