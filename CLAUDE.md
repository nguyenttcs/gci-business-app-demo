# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GCI Business App Demo — a mobile-style web app built with vanilla HTML, CSS, and JavaScript (no framework).

## Architecture

Single-page app — one `index.html` with tab panels shown/hidden by `js/app.js`. No build step.

```
index.html          ← shell: fixed header, scroll area, bottom nav, home indicator
styles/
  tokens.css        ← all CSS custom properties (colors, spacing, radius, shadows, type)
  main.css          ← component styles (no Tailwind; pure CSS using token vars)
js/
  app.js            ← bottom nav tab switching
```

**Layout structure:**
- Fixed purple-gradient header: 104px (44px status bar + 60px page header)
- Scrollable `.scroll-area`: `margin-top: 104px`, `padding-bottom: nav + indicator`
- Fixed bottom nav: 56px, `bottom: 34px`
- Fixed home indicator: 34px, `bottom: 0`

**Tab panels:** `.tab-panel` divs inside `.scroll-area`, toggled with class `active`. IDs: `tab-report`, `tab-home`, `tab-campaigns`, `tab-insights`, `tab-settings`.

## Design System (from Figma `cg3fxroFuuD8YhSBzcmnT8`, node `6529:17589`)

- **Font:** Inter 400/500/600/700 (Google Fonts)
- **Font sizes:** 10/12/14/16/18/20/24px → `--t-xs` through `--t-2xl`
- **Brand:** `--brand-primary: #5f2eea` · `--brand-blue: #1c6bea` · `--brand-10: #e3dffc` · `--brand-30: #9782f2`
- **Neutrals:** `--bg: #f2f2f6` · `--white: #fefefe` · `--dark: #2f2c35` · `--text-primary: #3d3d3d` · `--text-secondary: rgba(61,61,61,0.7)`
- **Status:** `--success: #26aa68` · `--teal: #54e4bd`
- **Card tints:** green `#d9ffd2`, blue `#d2e7ff`, yellow `#fff4d2`, purple `#ecd2ff`
- **Radius:** `--r-sm:6` · `--r-md:8` · `--r-lg:12` · `--r-xl:16` · `--r-full:100px`
- **Shadows:** `--shadow-card: 0px 2px 16px rgba(0,0,0,0.1)` · `--shadow-chip: 0px 0px 12px rgba(0,0,0,0.11)`

## Development

```bash
npx serve .
# or
python3 -m http.server
```

## Conventions

- All design values must reference CSS vars from `tokens.css` — never hardcode hex colors or px sizes.
- Each new page is a `.tab-panel` div inside `.scroll-area`; add a matching `.nav-item` button in `.bottom-nav`.
- Mobile-first layout: phone frame is fixed at 375px width.
