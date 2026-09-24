# Status

Last updated: 2026-09-24

## Where things stand

- Neo-brutalist redesign is on `main`, following `portfolio_design_spec.md` (Archivo Black / Space Grotesk / JetBrains Mono / Instrument Serif, Clash / Acid / Noir palettes, Restrained / Springy / Chaotic motion).
- The site is split into separate pages: `/`, `/about`, `/experience`, `/projects`, `/education`, `/skills`, `/contact`, plus a styled 404.
- Projects page has three case studies, newest first: Chess Engine, Blockchain Innovation Club, REC (the club website), then VoicePath. Details come from each project's README and code. Chess Engine is also the featured project on the home page.
- `CLAUDE.md` holds the working rules for Claude: push straight to `main`, the checks to run, where things live and how to add a project.
- Experience lists Technology Executive, Blockchain Innovation Club (Jul 2026 – Present). The role links to the club website case study.
- Spec motion (reveals, parallax, magnets, cursor, scramble, page wipe) is native CSS/JS; library animations from Motion, Kokonut UI and Bklit UI sit on top.

## Done: add the chess engine to Projects, and write CLAUDE.md (on `main`)

Live at https://foai-chess-engine.web.app, code at https://github.com/SaIdEeVaN/FOAI-Project.

- [x] Gather facts from the repo: README, `PRD.md`, `status.md`, `package.json`, deploy workflow, and the engine code for each claim on the page (2s budget checked every 2,048 nodes, Web Worker, 60s teaching-mode limit)
- [x] Add a `chess-engine` entry to `src/app/lib/projects.ts`, first in the list
  - [x] Named "Chess Engine", not the Firebase project name `foai-chess-engine`
  - [x] Tags: JavaScript, React, Vite, Web Workers, GitHub Actions, Firebase Hosting
  - [x] Four facts: Year, Role, Engine, Frontend. Role was first "Course"; Sai confirmed it was a solo build, so it is now "Role: Sole developer" like the club website. The course is still named in the description.
  - [x] Languages from GitHub: JavaScript 92,035, CSS 23,350, HTML 742 bytes. The API was blocked at first because the repo wasn't attached to the session, so they were counted from the repo instead. Once it was attached, GitHub's API returned the same three numbers, and `languagesSource` now says "from GitHub" like the other projects.
  - [x] "How it works", five steps: move generation → evaluation → search → ordering and caching → teaching mode
  - [x] "Rules the code enforces", three rules, each checked in the code: search runs in a Web Worker; a move is always ready within the 2s budget; teaching-mode searches stop at 60s
- [x] Update the copy that names the projects: the Projects blurb in `src/app/lib/pages.ts` and the `/projects` metadata description
- [x] Replace the one-line `CLAUDE.md` with a real one. It still imports `AGENTS.md`, and adds: push directly to `main`, commands and checks, where things live, how to add a project, and design conventions.
- [x] Verify:
  - [x] Lint clean, `tsc --noEmit` clean, `next build` passes (14 static pages)
  - [x] Headless Chromium at 320, 360, 390, 768 and 1440px, plus 390px with reduced motion, on `/projects` and `/`. Nothing runs past the viewport. Case studies are in order (chess-engine, bic-rec, voicepath). The ring is 242px at 320, 282px at 360 and 300px from 390 up, with 3 languages, 5 steps and 3 rules. The home page features Chess Engine. No console errors or warnings.
  - [x] Screenshots checked at 360 and 1440px, plus the home page feature
  - [ ] Not checked from this session: the live chess site itself (the egress proxy blocks `*.web.app`)
- [x] Update STATUS.md, commit, push to `main`

## Done: fix the 360px overflow on Projects (on `main`)

At 360px wide, the "Code by language" box (300px ring plus padding) is 346px in a 328px column, so both case studies are clipped about 18px on the right. 390px and wider are fine.

- [x] Find how the Bklit ring chart sizes itself. With a fixed `size` it's rigid. Without one, it measures its parent (visx `ParentSize`) and scales rings and center together, capped at 1:1.
- [x] Make the ring shrink to fit narrow columns without changing it at 390px and up. `LanguageRing` drops `size={300}`; `.languages__chart` is `width: 300px; max-width: 100%; aspect-ratio: 1`; the narrow-screen grid column is `minmax(0, 1fr)` so the chart can't force it wider.
- [x] First check: 360px fixed. Both boxes are 328px in a 328px column, the ring is 282px, hover works, and there are no console errors. 390px and up are unchanged (ring 300×300).
- [x] 320px still overflowed, and the cause was the club title rather than the ring: "BLOCKCHAIN" is 306px at the title's 44px minimum, in a 288px column. Below 360px, the title now sizes at `12cqw` with no minimum (34.56px at 320px). Nothing changes at 360px and up.
- [x] At 320px, "TYPESCRIPT" ran into its percentage in VoicePath's legend (about 125px of text in a 116px column). Below 360px, legend names are now 15px.
- [x] Verify:
  - [x] Lint clean, `tsc --noEmit` clean, `next build` passes
  - [x] Headless Chrome at 320, 360, 390, 768 and 1440px, plus 360px with motion on. Nothing runs past the viewport at any width. Rings are 242px at 320, 282px at 360 and 300px from 390 up. No legend name or title overflows. Hovering a legend row still switches the center label. No console errors.
  - [x] Screenshots checked at 320, 360 and 1440px
- [x] Update STATUS.md, commit, push to `main`

## Done: rename the club project, link the role, push (on `main`)

- [x] Rename the project to "Blockchain Innovation Club, REC". The summary no longer repeats the club name, the "Club" fact became "Role: Sole developer", and the Projects blurb now reads "The Blockchain Innovation Club website and VoicePath."
- [x] Link the Technology Executive role on Experience to the case study. The row now has a "See the club website I built →" button that goes to `/projects#bic-rec`.
- [x] Fix the page wipe for links with a `#hash`. It used to wait for its 6s timeout and then scroll to the top. Now it shows the right page name, detects arrival by path, and scrolls to the anchor.
- [x] Check that the jump lands with the title visible. `.project` got a `scroll-margin-top`, so the title sits 33px below the nav on desktop and 17px below it on phones.
- [x] Verify:
  - [x] Lint clean, `tsc --noEmit` clean, `next build` passes
  - [x] Headless Chrome: the title's widest word ("Blockchain") fits at 1440, 1280, 1024, 768, 390 and 360px, wrapping to 3 lines
  - [x] The link lands on `/projects#bic-rec` with motion on (the wipe reads "Projects") and with reduced motion, at 1440px and 390px, with no console errors
- [x] Update STATUS.md, commit, push to `main`

## Done: add the BIC-REC club website to Projects (`82f5540`)

Live at https://bicrec.web.app, code at https://github.com/SaIdEeVaN/BIC-REC_Site.

- [x] Gather facts from the repo and live site. README, `package.json`, deploy workflow and GitHub languages all read. Findings are below.
- [x] Confirm with Sai: built it solo, year 2026, list it above VoicePath. (Name later changed to "Blockchain Innovation Club, REC", and the Experience link was added; see above.)
- [x] Add a `bic-rec` entry to `src/app/lib/projects.ts`
  - [x] Name, year, summary and description (official site of the Blockchain Innovation Club, REC: events, team, gallery, projects, resources, join, contact)
  - [x] Tags: React, Vite, Tailwind CSS, React Router, Motion, Playwright, Firebase Hosting
  - [x] `repoUrl` and `liveUrl`
  - [x] Four facts: Year, Club (now Role), Frontend, Hosting
  - [x] Languages from GitHub: JavaScript 159,339, CSS 11,223, HTML 6,993 bytes. `languagesSource` note updated.
  - [x] "How it works", five steps (the pipeline grid has five columns): design system → motion kit → share previews → Playwright tests → GitHub Actions + Firebase deploy
  - [x] "Rules the code enforces", three rules (the grid has three columns), each backed by the repo: no sideways scroll at 360/390/1280px; every route has its own title and share tags; reduced motion renders the final state. "Nothing fades or blurs" was dropped because it's a design convention, not something the code checks.
- [x] Check the layout. `LanguageRing` looks right with three languages. A new `.project + .project` rule (3px top rule plus spacing) separates the two case studies.
- [x] Project order: club website above VoicePath
- [x] Update the copy that names only VoicePath: the `/projects` metadata description and the Projects blurb in `src/app/lib/pages.ts`
- [x] Verify lint, types, build, and the page in Chrome at 1440px and 390px (console errors, overflow, reduced motion)
  - [x] `node_modules` was missing; reinstalled with `npm ci`
  - [x] Lint clean, `tsc --noEmit` clean, `next build` passes (14 static pages)
  - [x] Browser check in headless Chrome over DevTools, since the Chrome extension wasn't connected. Ran at 1440px, 390px, and 390px with reduced motion. No horizontal overflow and no console errors or warnings. The ring and legend show 3 languages, with 5 steps and 3 rules, and the separator appears only on the second case study. Screenshots of each section checked.
- [x] Update "Where things stand" and commit to `main`
- [x] Push to `main` (together with the rename and role link)

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
- `PageLink` accepts `/page#id` links: the page wipe runs as usual, then scrolls to that id instead of the top.
- Work is committed and pushed straight to `main`, with no feature branches or pull requests (written into `CLAUDE.md`).
- A project's display name is a readable title, not its repo or hosting slug ("Chess Engine", not "foai-chess-engine").
- The "Code by language" ring sizes to its box (at most 300px) rather than a fixed 300px, so it shrinks on narrow phones. Below 360px, case study titles and legend names also shrink; at 360px and up nothing changes.
