# Status

Last updated: 2026-09-14

## Where things stand

- Neo-brutalist redesign is on `main`, following `portfolio_design_spec.md` (Archivo Black / Space Grotesk / JetBrains Mono / Instrument Serif, Clash / Acid / Noir palettes, Restrained / Springy / Chaotic motion).
- The site is split into separate pages: `/`, `/about`, `/experience`, `/projects`, `/education`, `/skills`, `/contact`, plus a styled 404.
- Projects page features VoicePath, with details taken from its README.
- Experience lists Technology Executive, Blockchain Innovation Club (Jul 2026 – Present).
- Spec motion (reveals, parallax, magnets, cursor, scramble, page wipe) is native CSS/JS; library animations from Motion, Kokonut UI and Bklit UI sit on top.

## Done: UI animations from Motion, Bklit UI and Kokonut UI (on `main`)

- [x] Research what each library offers and pick animations that suit the design
- [x] Create STATUS.md
- [x] Install Motion and set up the shadcn registry (components.json, `cn` utility) — motion 13.3, Bklit gauge + ring charts in `src/components/charts`, Kokonut text in `src/components/kokonutui`
- [x] Motion: scroll progress bar, sliding current-page marker in the nav, animated mobile menu
- [x] Kokonut UI: Swoosh Text on page titles
- [x] Kokonut UI: Dynamic Text greeting (Hello / வணக்கம் / नमस्ते) in the hero
- [x] Bklit UI: gauges for CGPA 8.71 and 92.2% on Education
- [x] Bklit UI: VoicePath code-by-language ring chart on Projects
- [x] Verify lint, types, build and browser behavior — all pass; checked in Chrome at 1440px and 390px (no console errors or overflow, reduced motion respected).
- [x] Commit and push to `main`

Picked because they fit the neo-brutalist look or show real data. Bklit UI is a charts library, so it's only used where there are real numbers.

## Done

- [x] Neo-brutalist redesign — `d344b57`
- [x] Separate pages and Projects page (VoicePath) — `3ebc787`
- [x] Technology Executive role added to Experience

## Decisions

- Old single-page anchors (`/#about`) now open the home page.
- Tech Team Member end date set to Jun 2026 so it doesn't overlap the Technology Executive role.
- Registry components live in `src/components` (Bklit charts, Kokonut text); site code stays in `src/app`. Kokonut components were restyled to the palette tokens.
- Two React Compiler lint rules (`set-state-in-effect`, `refs`) are turned off for `src/components/charts/**` only, because the vendored Bklit chart code trips them by design.
- Chart animations play when the chart scrolls into view and are skipped for OS reduced motion. Restrained motion turns off Motion's transform and layout animations site-wide.
