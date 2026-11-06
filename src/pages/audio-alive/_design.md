# Audio Alive — Design System

Pages for the Audio Alive Android app. The look is taken from the app itself
(`AudioAlive/app/src/main/java/com/audioalive/MainActivity.kt`, the `Pal` object),
so the site and the app feel like one product.

> These pages do **not** use the hub's Tailwind theme or `BaseLayout`.
>
> | File | Role |
> |---|---|
> | `_AliveLayout.astro` | HTML shell: `<head>` SEO/OG/Twitter meta, JSON-LD, font, footer |
> | `_alive.css` | Whole stylesheet (tokens + components) |
> | `_content.ts` | Copy, specs, FAQ. Single source for the visible page **and** its JSON-LD |
> | `_Icon.astro` | Inline line icons (24×24, round caps) |
> | `index.astro` | Landing → `/audio-alive/` |
> | `privacy.astro` | Privacy policy → `/audio-alive/privacy/` |

## Colors (`:root` in `_alive.css`)

| Token | Value | App name | Use |
|---|---|---|---|
| `--bg` | `#0B0E10` | `Bg` | Page background, `theme-color` |
| `--card` / `--card-border` | `#151A1D` / `#222A2F` | `Card` / `CardBorder` | Cards |
| `--teal` | `#3EE6D6` | `Teal` | Brand accent, links, icons |
| `--teal-bright` → `--teal-deep` | `#6FF0E3` → `#1FB8AA` | | Radial gradient of the power button and primary CTA |
| `--teal-dark` | `#00201D` | `TealDark` | Text/icon on teal |
| `--teal-tile` | `#12312E` | `TealTile` | Icon tiles, eyebrow, TL;DR box (also the app icon background) |
| `--text-strong` / `--text-body` / `--text-muted` / `--text-faint` | `#F2F5F6` / `#D3DADE` / `#9BA7AE` / `#8C979E` | | Text levels |
| `--pill` / `--off-border` | `#1B2124` / `#2C353A` | `PillFill` / `OffBorder` | Pills, ghost button |
| `--green` / `--amber` | `#4ADE80` / `#F5C76A` | `Green` / `Amber` | Connected dot / "Coming soon" dot |

## Type

Inter 400–700 (the app uses the Android system font; Inter is the closest web match).
Hero h1 `clamp(36px, 5.2vw, 56px)` 700 −0.03em · h2 `clamp(28px, 3.6vw, 38px)` 700 · body 15–18px.

## Components

- **Power button card** (hero visual): copy of the app's `HeroCard`: 152px teal radial button, three pulse rings (2.6 s, offsets 0/0.87/1.74 s, scale to 1.55), glow 1.3 s, "USB dongle: connected" pill.
- **Cards**: radius 24px (28px for the device card), 1px border.
- **Buttons**: 52px tall, radius 26px. Primary uses the power-button gradient; ghost uses the pill colors.
- **Steps**: CSS counter in a teal tile.
- **FAQ**: `<details>`; question is an `h3` inside `summary`.
- Motion is disabled under `prefers-reduced-motion`.

## SEO / AI answer engines

- One-sentence definition (`DEFINITION`) is the hero lede and the JSON-LD description.
- The problem section answers "Why does a USB-C dongle cut off the start of audio?" in its first paragraph.
- JSON-LD graph: `WebPage`, `MobileApplication`, `Person`, `FAQPage`, `HowTo`, `BreadcrumbList`, all built from `_content.ts` so markup always matches visible text.
- OG/Twitter image is the Play feature graphic (`public/og/audio-alive.png`, 1024×500).

## Launch checklist

When the app is on Google Play:

1. `_content.ts`: set `released: true` (CTA becomes "Get it on Google Play", `installUrl` added to JSON-LD) and update the "Is it available yet?" FAQ, the `Status` spec row and the "Coming soon" texts in `index.astro`.
2. `src/content/products/audio-alive.json`: set `status` to `Live`.
