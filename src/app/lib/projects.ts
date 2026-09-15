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
    slug: "bic-rec",
    name: "BIC-REC Website",
    year: "2026",
    summary:
      "The official website of the Blockchain Innovation Club at Rajalakshmi Engineering College, built on a neo-brutalist design system.",
    description:
      "One home for the club: a filterable event ledger with detail pages, achievements, board and core team profiles, a gallery, news, the club's own projects, learning resources, membership info and a contact form. I built it on my own, from the design system to the tests and the automatic deploys.",
    tags: ["React", "Vite", "Tailwind CSS", "React Router", "Motion", "Playwright", "Firebase Hosting"],
    repoUrl: "https://github.com/SaIdEeVaN/BIC-REC_Site",
    liveUrl: "https://bicrec.web.app",
    facts: [
      { label: "Year", value: "2026" },
      { label: "Club", value: "Blockchain Innovation Club, REC" },
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
      "Someone describes the work they have done, out loud, in Tamil, Hindi, English or a mix of them. VoicePath extracts the skills, normalizes them against a standard taxonomy, matches them to real district-level openings and training, and explains every match in plain language — using only what the person actually said.",
    tags: ["Python", "FastAPI", "Next.js", "TypeScript", "faster-whisper", "Piper", "Supabase"],
    repoUrl: "https://github.com/SaIdEeVaN/voicepath",
    liveUrl: "https://voicepath.vercel.app",
    facts: [
      { label: "Year", value: "2026" },
      { label: "Languages", value: "Tamil, Hindi, English, or a mix" },
      { label: "Backend", value: "FastAPI, with an optional Supabase database" },
      { label: "Frontend", value: "Next.js App Router, TypeScript, Tailwind v4" },
    ],
    // GitHub's language breakdown for the repo (bytes), top five languages.
    languages: [
      { name: "Python", bytes: 506_815 },
      { name: "TypeScript", bytes: 255_592 },
      { name: "PLpgSQL", bytes: 17_606 },
      { name: "CSS", bytes: 11_220 },
      { name: "Dockerfile", bytes: 1_723 },
    ],
    languagesSource: "Top five languages by bytes of code, from GitHub, September 2026.",
    pipelineNote:
      "Every component except the LLM runs on the machine, and raw audio isn't kept unless the person opts in.",
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
        tool: "multilingual-e5-base",
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
