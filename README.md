# Portfolio — Baviri Setty Sai Deevan

Personal portfolio built with Next.js (App Router) and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

### Custom port (Windows)

On this repo, passing flags via `npm run dev -- --port 3001` may get mangled into `next dev 3001` (treated as a directory).

- PowerShell:
	- `$env:PORT=3001; npm run dev`
- Or use the wrapper script:
	- `npm run dev:port -- 3001`

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Configuration (optional)

For correct canonical/OpenGraph URLs in metadata, set:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

If not set, the app falls back to `VERCEL_URL` when deployed on Vercel, or `http://localhost:3000` in development.

## Project notes

- Single-page sections: Home, About, Experience, Education, Skills, Contact (anchored routes like `/#about`).
- Convenience routes (`/about`, `/experience`, etc.) redirect to the corresponding section.
- Accessibility: keyboard focus rings, skip-to-content link, and reduced-motion fallbacks.
