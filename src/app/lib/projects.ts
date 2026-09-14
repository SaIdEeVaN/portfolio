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
  pipelineNote: string;
  pipeline: { title: string; text: string; tool: string }[];
  rules: { title: string; text: string }[];
};

// Details are taken from the project's README: https://github.com/SaIdEeVaN/voicepath
export const PROJECTS: Project[] = [
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
