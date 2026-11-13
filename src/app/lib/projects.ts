export type ProjectLanguage = {
  name: string;
  bytes: number;
};

export type Project = {
  slug: string;
  name: string;
  year: string;
  summary: string;
  description: string;
  tags: string[];
  repoUrl: string;
  liveUrl?: string;
  // A package published on PyPI, shown as a "View on PyPI" button.
  pypiUrl?: string;
  facts: { label: string; value: string }[];
  languages: ProjectLanguage[];
  languagesSource: string;
  pipelineNote: string;
  pipeline: { title: string; text: string; tool: string }[];
  rules: { title: string; text: string }[];
};

// Details are taken from each project's README, linked in repoUrl.
export const PROJECTS: Project[] = [
  {
    slug: "secretsentinel",
    name: "SecretSentinel",
    year: "2026",
    summary:
      "A secret scanner for application and Web3 code. It checks files and Git history, and fails the build when a key leaks. On PyPI as secretsentinel-scanner.",
    description:
      "Built on Gitleaks, with 18 rules of its own for Web3 — EVM and Solana signing keys, mnemonics, keystores and RPC URLs with keys in them — and 2 for gaps in Gitleaks' defaults. It runs from the command line, as a pre-commit hook on staged changes, and as a GitHub Action that reports findings as annotations. A dashboard keeps scan history, triage, suppressions that need a reason, a reviewer and an expiry date, and an audit trail, with JSON, CSV and SARIF exports. A daily GitHub Actions job scans a list of repositories and sends only sanitized reports to a hosted copy on Render with a Neon Postgres database. Version 1.0.0 is on PyPI: pip install secretsentinel-scanner.",
    tags: ["Python", "Gitleaks", "FastAPI", "React", "GitHub Actions", "PyPI", "Postgres"],
    repoUrl: "https://github.com/SaIdEeVaN/secretsentinel",
    pypiUrl: "https://pypi.org/project/secretsentinel-scanner/",
    facts: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Sole developer" },
      { label: "Package", value: "secretsentinel-scanner 1.0.0 on PyPI, Python 3.11+" },
      { label: "Scanner", value: "Gitleaks 8.30.1 plus 20 rules of its own" },
    ],
    // Top five languages (bytes) at cfee50a, counted from the repo the way GitHub does; its
    // API wasn't reachable. Solidity (4,497) is sixth.
    languages: [
      { name: "Python", bytes: 413_664 },
      { name: "JavaScript", bytes: 194_597 },
      { name: "Shell", bytes: 9_371 },
      { name: "PowerShell", bytes: 8_966 },
      { name: "CSS", bytes: 6_178 },
    ],
    languagesSource:
      "Top five languages by bytes of code, counted from the repo the way GitHub counts them, November 2026.",
    pipelineNote:
      "It never uses a credential it finds, contacts a wallet or runs code from the repository it scans.",
    pipeline: [
      {
        title: "Scan",
        text: "Gitleaks reads the current files, the Git history, or both, with its default rules and SecretSentinel's own.",
        tool: "Gitleaks 8.30.1, checksum-verified",
      },
      {
        title: "Web3 rules",
        text: "18 rules for EVM and Solana signing keys, mnemonics, keystores and keyed RPC URLs, and 2 for gaps in the defaults.",
        tool: "web3_rules.toml",
      },
      {
        title: "Redact",
        text: "Overlapping matches are merged and each finding gets a severity. The value is dropped; a report keeps the file, line, commit and rule.",
        tool: "Classifier + sanitizer",
      },
      {
        title: "Policy",
        text: "A severity threshold, path exclusions and reviewed suppressions with an expiry date decide what blocks.",
        tool: ".secretsentinel.yml",
      },
      {
        title: "Report",
        text: "A blocking finding fails the CI check or refuses the commit. The dashboard shows history, triage and an audit trail.",
        tool: "CLI, pre-commit hook, GitHub Action, dashboard",
      },
    ],
    rules: [
      {
        title: "No secret in any output",
        text: "Every test fixture is a canary. After real scans, none may appear in CLI output, exports, GitHub annotations, API responses, the database or logs.",
      },
      {
        title: "It fails closed",
        text: "Exit 1 for a blocking finding, 2 for bad input or policy, 3 if the scan can't run. Every nonzero exit fails the check, and the hook refuses the commit.",
      },
      {
        title: "A release is checked before PyPI sees it",
        text: "The release job installs the built wheel in a clean environment, checks its ruleset matches the repo's, and must block the demo before it publishes.",
      },
    ],
  },
  {
    slug: "chess-engine",
    name: "Chess Engine",
    year: "2026",
    summary:
      "Play chess in the browser against a search engine written from scratch, then watch what each search technique saves.",
    description:
      "Built for the Foundations of Artificial Intelligence course. The opponent is a classical engine — minimax with alpha-beta pruning, iterative deepening, quiescence search, null-move pruning, move ordering with killer moves and the history heuristic, and a fixed-size, Zobrist-hashed transposition table — running in a Web Worker so the board never freezes. 44 of its evaluation weights were learned from its own games: Texel tuning fitted them by logistic regression on 257,691 positions from 3,941 self-play games. Games can run on a clock, from 1-minute bullet to 15+10 rapid, with premoves and moves typed in SAN. Over 128 games against Stockfish 19 at four calibrated strengths, it rated about 1900–2000 at one second a move, about 200 points above the September version. Teaching mode searches a position three ways at a fixed depth: from the opening, alpha-beta cuts plain minimax's 5,072,213 nodes to 131,362.",
    tags: ["JavaScript", "React", "Vite", "Web Workers", "GitHub Actions", "Firebase Hosting"],
    repoUrl: "https://github.com/SaIdEeVaN/FOAI-Project",
    liveUrl: "https://foai-chess-engine.web.app",
    facts: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Sole developer" },
      { label: "Engine", value: "Alpha-beta search, Texel-tuned evaluation, in a Web Worker" },
      { label: "Strength", value: "About 1900–2000 on Stockfish 19's UCI_Elo scale" },
    ],
    // GitHub's language breakdown for the repo (bytes); it only has three.
    languages: [
      { name: "JavaScript", bytes: 265_038 },
      { name: "CSS", bytes: 27_853 },
      { name: "HTML", bytes: 742 },
    ],
    languagesSource: "All three languages by bytes of code, from GitHub, November 2026.",
    pipelineNote:
      "The whole engine runs in the browser, with no server, so nothing about a game leaves the page.",
    pipeline: [
      {
        title: "Move generation",
        text: "Legal moves for every piece, including castling, en passant and promotion, matching the published perft counts on seven standard positions.",
        tool: "Custom board + move generator",
      },
      {
        title: "Evaluation",
        text: "Material, piece-square tables, pawn structure and passed pawns, king safety, mobility, rook files and the bishop pair, blended from middlegame to endgame. 44 weights were learned from self-play.",
        tool: "Tapered evaluation + Texel tuning",
      },
      {
        title: "Search",
        text: "Alpha-beta goes one ply deeper at a time and follows captures past the last ply. Letting the side to move pass cuts lines that can't matter, worth about 130 Elo in self-play.",
        tool: "Iterative deepening + quiescence + null-move",
      },
      {
        title: "Ordering and caching",
        text: "The stored best move goes first, then captures by most valuable victim, then quiet moves that cut off before: 42% fewer nodes to depth 7. Results live in a 10 MB table.",
        tool: "MVV-LVA + killers + history + Zobrist table",
      },
      {
        title: "Teaching mode",
        text: "The board, or any FEN you paste, is searched three ways at depth 5 to compare nodes and time, beside a term-by-term breakdown of the evaluation. Searches stop at 60 seconds.",
        tool: "Fixed-depth search with switchable techniques",
      },
    ],
    rules: [
      {
        title: "The board never waits on the engine",
        text: "Every search runs in a Web Worker and streams its progress back, so the page stays responsive while the engine thinks.",
      },
      {
        title: "A move is always ready",
        text: "Each move gets a budget, 2 seconds or a slice of the engine's clock, checked every 2,048 nodes. Depth 1 always finishes; a deeper search cut short is thrown away.",
      },
      {
        title: "A failing test stops a deploy",
        text: "GitHub Actions runs 62 tests, perft counts included, before every build, and deploys to Firebase only if they all pass.",
      },
    ],
  },
  {
    slug: "bic-rec",
    name: "Blockchain Innovation Club, REC",
    year: "2026",
    summary:
      "The club's official website at Rajalakshmi Engineering College, built on a neo-brutalist design system.",
    description:
      "One home for the club: a filterable event ledger with detail pages, achievements, board and core team profiles, a gallery, news, the club's own projects, learning resources, membership info and a contact form. I built it on my own, from the design system to the tests and the automatic deploys.",
    tags: ["React", "Vite", "Tailwind CSS", "React Router", "Motion", "Playwright", "Firebase Hosting"],
    repoUrl: "https://github.com/SaIdEeVaN/BIC-REC_Site",
    liveUrl: "https://bicrec.web.app",
    facts: [
      { label: "Year", value: "2026" },
      { label: "Role", value: "Sole developer" },
      { label: "Frontend", value: "React 18, Vite, Tailwind CSS, React Router v7" },
      { label: "Hosting", value: "Firebase Hosting, deployed by GitHub Actions" },
    ],
    // GitHub's language breakdown for the repo (bytes); it only has three.
    languages: [
      { name: "JavaScript", bytes: 159_339 },
      { name: "CSS", bytes: 11_223 },
      { name: "HTML", bytes: 6_993 },
    ],
    languagesSource: "All three languages by bytes of code, from GitHub, September 2026.",
    pipelineNote:
      "Every page follows one design spec, and a push to main is all it takes to put a change live.",
    pipeline: [
      {
        title: "Design system",
        text: "Hard geometry, 3px ink rules, hard offset shadows and blockchain vocabulary: block numbers, hashes, sealed dates.",
        tool: "DESIGN_SYSTEM.md + Tailwind tokens",
      },
      {
        title: "Motion kit",
        text: "Blocks shunt, slam, draw and decrypt, using a small set of animation primitives shared by every page.",
        tool: "Motion",
      },
      {
        title: "Share previews",
        text: "The build writes an HTML file for each route, so links shared on WhatsApp or LinkedIn preview the right page.",
        tool: "Vite + prerender script",
      },
      {
        title: "Tests",
        text: "Every page is loaded at phone and desktop widths and checked for layout, titles and share tags.",
        tool: "Playwright",
      },
      {
        title: "Deploy",
        text: "Each push to main installs, builds and deploys the site with no manual steps.",
        tool: "GitHub Actions + Firebase",
      },
    ],
    rules: [
      {
        title: "No sideways scroll",
        text: "Playwright opens every page at 360, 390 and 1280px and fails if anything is wider than the screen.",
      },
      {
        title: "Every route has its own preview",
        text: "Each route gets its own title and share tags at build time, and the tests check that they match.",
      },
      {
        title: "Reduced motion skips animation",
        text: "With the OS reduce-motion setting on, every page renders in its final state straight away.",
      },
    ],
  },
  {
    slug: "voicepath",
    name: "VoicePath",
    year: "2026",
    summary:
      "Voice-first skill discovery and scheme matching for Scheduled Caste beneficiaries under the PM-AJAY skilling ecosystem.",
    description:
      "Someone describes the work they have done, out loud, in Tamil, Hindi, English or a mix of them. VoicePath extracts the skills, normalizes them against a standard taxonomy, matches them to real district-level openings and training, and explains every match in plain language — using only what the person actually said. A map shows the openings and the places that can help — training centres, employment offices, banks — from OpenStreetMap, around a town in every Tamil Nadu district. People can ask about a scheme and get an answer that cites its official documents, and anyone who says they are in danger gets the emergency numbers first, before any model is asked.",
    tags: ["Python", "FastAPI", "Next.js", "TypeScript", "faster-whisper", "Piper", "Supabase", "MapLibre"],
    repoUrl: "https://github.com/SaIdEeVaN/voicepath",
    liveUrl: "https://voicepath.vercel.app",
    facts: [
      { label: "Year", value: "2026" },
      { label: "Languages", value: "Tamil, Hindi, English, or a mix" },
      { label: "Backend", value: "FastAPI, with an optional Supabase database" },
      { label: "Frontend", value: "Next.js App Router, TypeScript, Tailwind v4" },
    ],
    // Top five languages (bytes) at 5ef4cb9, counted from the repo the way GitHub does. That
    // count matched GitHub's own numbers exactly in September. PLpgSQL is the db/ files GitHub
    // counted then, all unchanged; the new SQL files are plain SQL, which GitHub leaves out.
    languages: [
      { name: "Python", bytes: 873_514 },
      { name: "TypeScript", bytes: 379_625 },
      { name: "CSS", bytes: 22_402 },
      { name: "PLpgSQL", bytes: 17_606 },
      { name: "Dockerfile", bytes: 1_723 },
    ],
    languagesSource:
      "Top five languages by bytes of code, counted from the repo the way GitHub counts them, November 2026.",
    pipelineNote:
      "Every component except the LLM runs on the machine, and recordings are never kept: speech is transcribed in memory and the audio is discarded.",
    pipeline: [
      {
        title: "Speech to text",
        text: "The spoken description becomes a transcript, locally on the CPU.",
        tool: "faster-whisper",
      },
      {
        title: "Skill extraction",
        text: "An LLM pulls out a profile and skills, and every evidence phrase is checked against the transcript.",
        tool: "Groq-hosted open-weight LLM",
      },
      {
        title: "Normalization",
        text: "Extracted skills are mapped to taxonomy ids using multilingual embeddings.",
        tool: "multilingual-e5-small",
      },
      {
        title: "Matching",
        text: "Skills are ranked against district-level openings and training, with no LLM involved.",
        tool: "Deterministic ranking",
      },
      {
        title: "Explanation",
        text: "Each match is explained in plain language from a closed set of grounding facts.",
        tool: "LLM that cannot re-rank",
      },
    ],
    rules: [
      {
        title: "Extraction never invents",
        text: "A skill whose evidence phrase can't be found in the transcript is dropped entirely.",
      },
      {
        title: "Ranking is deterministic",
        text: "The matching service imports no LLM, so the same profile and catalogue always give the same ranking.",
      },
      {
        title: "Explanations cannot re-rank",
        text: "The explainer returns bullets and a summary, with no field a score could travel back through.",
      },
    ],
  },
];

// Each case study has its own page at /projects/<slug>.
export function projectHref(project: Project) {
  return `/projects/${project.slug}`;
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

// The one after it in PROJECTS, wrapping around to the first.
export function getNextProject(project: Project): Project {
  const index = PROJECTS.indexOf(project);
  return PROJECTS[(index + 1) % PROJECTS.length];
}

// Card and next-link colors, cycled by position. Projects' own accent (a2) colors the page header.
const PROJECT_ACCENTS = ["a4", "a3", "a1"] as const;

export function projectAccent(project: Project) {
  return PROJECT_ACCENTS[PROJECTS.indexOf(project) % PROJECT_ACCENTS.length];
}
