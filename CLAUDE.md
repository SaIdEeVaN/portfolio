@AGENTS.md

# CLAUDE.md

Portfolio site for Baviri Setty Sai Deevan: Next.js 16 (App Router), React 19, Tailwind CSS v4,
TypeScript. `README.md` covers running the site; `STATUS.md` is the running log of work done and
the decisions behind it.

## Git workflow

- Commit and push directly to `main`. Do not create feature branches or pull requests.
- Before pushing, run the checks below and make sure they all pass. GitHub Actions
  (`.github/workflows/ci.yml`) runs the same checks on every push to `main`; check that run too.
- After each piece of work, update `STATUS.md`: tick the items off, and add any new decision to
  its Decisions list.

## Commands

```bash
npm ci               # install (node_modules is not committed)
npm run dev          # http://localhost:3000
npm run lint         # ESLint
npm run build        # production build; every page is static
npx tsc --noEmit     # type check (after a build, which generates Next's route types)
npm run test:e2e     # Playwright browser tests against the production build
```

The browser tests (`tests/site.spec.ts`) open every page and every project page at 320, 360, 390,
768 and 1440px, and at 390px with reduced motion. They fail if anything runs past the right edge,
a heading is wider than its box, or the console logs an error. They also check each page's title,
the project pages' share tags and preview images, the 404 for an unknown project, the sitemap, and
the links into project pages. Third-party images (skill and contact icons) are replaced with a
placeholder, so a CDN outage can't fail them.

Before the first run: `npx playwright install chromium`. On a machine whose preinstalled Chromium
doesn't match this Playwright version, point at it with `PLAYWRIGHT_CHROMIUM_PATH` instead.

For visual changes, still look at the page yourself; the tests catch overflow and errors, not
whether it looks right.

## Where things live

- `src/app/<page>/page.tsx`: one folder per page (`about`, `experience`, `projects`,
  `education`, `skills`, `contact`); `src/app/page.tsx` is the home page.
- `src/app/lib/pages.ts`: the page list, with nav labels, accent colors and blurbs. Each page
  ends with a link to the next one in this list.
- `src/app/lib/projects.ts`: the project case studies. `/projects` lists them as cards, and each
  has its own page at `/projects/<slug>` (`src/app/projects/[slug]/`, built from
  `src/app/components/ProjectCaseStudy.tsx`) with its own share preview image. The first entry is
  also the featured project on the home page.
- `src/app/lib/site.ts`: site name, URL and `pageMetadata()` for each page's title and share tags.
- `src/app/components/`: site components (nav, footer, page wipe, scroll reveal, charts wrappers).
- `src/components/charts` (Bklit UI) and `src/components/kokonutui` (Kokonut UI): components
  installed from the registries in `components.json`. Keep the chart code as upstream wrote it;
  its two lint exceptions are in `eslint.config.mjs`.
- `src/app/globals.css`: design tokens and all site styles.

## Adding a project

1. Read the project's README, `package.json`, deploy config and code, so every claim on the page
   is backed by the repo. Don't invent features or numbers.
2. Add an entry to `PROJECTS` in `src/app/lib/projects.ts`, newest first:
   - `name` is a readable title, not the repo or hosting slug (for example "Chess Engine", not
     "foai-chess-engine").
   - `facts`: exactly four (the grid has four columns).
   - `languages`: bytes per language from GitHub (or counted from the repo the same way when
     the API can't be reached), and say which in `languagesSource`.
   - `pipeline`: exactly five steps (the grid has five columns).
   - `rules`: exactly three (the grid has three columns), and only rules the project's code,
     build or tests actually enforce.
   - `slug` becomes the page's URL, `/projects/<slug>`. The page, its preview image, the card on
     `/projects`, the next-project links and the sitemap entry all follow from the entry.
3. Update the copy that names the projects: the Projects `blurb` in `src/app/lib/pages.ts` and
   the `description` in `src/app/projects/page.tsx`.
4. Run the checks and browser tests, then look at the new project page, `/projects` and the home
   page's featured project yourself.

## Conventions

- Neo-brutalist design: Archivo Black, Space Grotesk, JetBrains Mono and Instrument Serif via
  `next/font`; 3px ink borders and hard offset shadows. Use the palette tokens (`--ink`,
  `--paper`, `--a1` to `--a4`) rather than hard-coded colors, so the Clash, Acid and Noir palettes
  all work.
- Motion must respect both the site's Restrained setting and `prefers-reduced-motion`.
- Internal links go through `PageLink` (`src/app/components/PageTransition.tsx`) so the page wipe
  runs. It accepts `/page#id` links. Links to a project page pass `wipeLabel={project.name}`.
- Big display titles have a 44px floor, which is too wide for long words below 360px. Those
  titles switch to a `cqw` size under `@media (max-width: 359px)`; do the same for any new one.
- Copy is plain and specific: short sentences, real numbers, no marketing language.
