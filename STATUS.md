# Status

Last updated: 2026-09-15

## Where things stand

- Neo-brutalist redesign is on `main`, following `portfolio_design_spec.md` (Archivo Black / Space Grotesk / JetBrains Mono / Instrument Serif, Clash / Acid / Noir palettes, Restrained / Springy / Chaotic motion).
- The site is split into separate pages: `/`, `/about`, `/experience`, `/projects`, `/education`, `/skills`, `/contact`, plus a styled 404.
- Projects page has two case studies, newest first: the BIC-REC club website, then VoicePath. Details come from each project's README.
- Experience lists Technology Executive, Blockchain Innovation Club (Jul 2026 – Present).
- Spec motion (reveals, parallax, magnets, cursor, scramble, page wipe) is native CSS/JS; library animations from Motion, Kokonut UI and Bklit UI sit on top.

## Done: add the BIC-REC club website to Projects (committed, not pushed)

Live at https://bicrec.web.app, code at https://github.com/SaIdEeVaN/BIC-REC_Site.

- [x] Gather facts from the repo and live site. README, `package.json`, deploy workflow and GitHub languages all read. Findings are below.
- [x] Confirm with Sai: built it solo, year 2026, list it above VoicePath. Name "BIC-REC Website" (default; no answer). Experience link skipped for now.
- [x] Add a `bic-rec` entry to `src/app/lib/projects.ts`
  - [x] Name, year, summary and description (official site of the Blockchain Innovation Club, REC: events, team, gallery, projects, resources, join, contact)
  - [x] Tags: React, Vite, Tailwind CSS, React Router, Motion, Playwright, Firebase Hosting
  - [x] `repoUrl` and `liveUrl`
  - [x] Four facts: Year, Club, Frontend, Hosting
  - [x] Languages from GitHub: JavaScript 159,339, CSS 11,223, HTML 6,993 bytes. `languagesSource` note updated.
  - [x] "How it works", five steps (the pipeline grid has five columns): design system → motion kit → share previews → Playwright tests → GitHub Actions + Firebase deploy
  - [x] "Rules the code enforces", three rules (the grid has three columns), each backed by the repo: no sideways scroll at 360/390/1280px; every route has its own title and share tags; reduced motion renders the final state. "Nothing fades or blurs" was dropped because it's a design convention, not something the code checks.
- [x] Check the layout. `LanguageRing` looks right with three languages. A new `.project + .project` rule (3px top rule plus spacing) separates the two case studies. "BIC-REC WEBSITE" wraps to two lines at 1440px and 390px without overflowing.
- [x] Project order: BIC-REC above VoicePath
- [x] Update the copy that names only VoicePath: the `/projects` metadata description and the Projects blurb in `src/app/lib/pages.ts`
- [ ] Optional: link the Technology Executive role on Experience to the new case study (skipped for now)
- [x] Verify lint, types, build, and the page in Chrome at 1440px and 390px (console errors, overflow, reduced motion)
  - [x] `node_modules` was missing; reinstalled with `npm ci`
  - [x] Lint clean, `tsc --noEmit` clean, `next build` passes (14 static pages)
  - [x] Browser check in headless Chrome over DevTools, since the Chrome extension wasn't connected. Ran at 1440px, 390px, and 390px with reduced motion. No horizontal overflow and no console errors or warnings. The ring and legend show 3 languages, with 5 steps and 3 rules, and the separator appears only on the second case study. Screenshots of each section checked.
- [x] Update "Where things stand" and commit to `main`
- [ ] Push to `main` after Sai has reviewed the new copy

Repo facts: React 18.3, Vite 8, Tailwind 3.4, React Router 7, Motion 13.2, Playwright 1.63, ESLint 10. `npm run build` also writes an HTML file for each route with its own share tags. GitHub Actions deploys to the Firebase project `bicrec` on every push to `main`. The site has 14 pages and follows its own neo-brutalist `DESIGN_SYSTEM.md`.

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
- Case studies on `/projects` are listed newest first.
- A case study's "Rules the code enforces" lists only rules the project's build or tests actually check.
