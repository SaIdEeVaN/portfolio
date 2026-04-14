import ScrollReveal from "../components/ScrollReveal";

type Experience = {
  role: string;
  organization: string;
  start: string;
  end: string;
  summary?: string;
  highlights?: string[];
};

export default function Experience() {
  const experiences: Experience[] = [
    {
      role: "Tech Team Member",
      organization: "Blockchain Innovation Club, Rajalakshmi Engineering College",
      start: "Nov 2025",
      end: "Present",
      summary:
        "Contributing to club technical initiatives and collaborative builds.",
      highlights: [
        'Led "Byte The Dust: A Cyber Forensics Event" during Titanium 2026.',
      ],
    },
    {
      role: "Web Development Intern",
      organization: "InternPe",
      start: "Dec 2025",
      end: "Jan 2026",
      summary: "Built and iterated on web features as part of an internship.",
    },
    {
      role: "Vice President",
      organization: "Science Club, Vivekananda Vidyalaya Jr. College",
      start: "Jun 2022",
      end: "Apr 2023",
      summary:
        "Supported club leadership, coordination, and student-led activities.",
    },
  ];

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">Experience</h1>
          <p className="max-w-2xl text-foreground/75">
            A short timeline of roles and responsibilities.
          </p>
        </header>
      </ScrollReveal>

      <ScrollReveal delayMs={80}>
        <ol className="relative space-y-4">
          {experiences.map((experience, index) => {
            const isLast = index === experiences.length - 1;
            return (
              <li
                key={`${experience.role}-${experience.organization}-${experience.start}`}
                className="relative pl-10"
              >
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-[11px] top-7 h-[calc(100%+16px)] w-[2px] bg-foreground/20"
                  />
                ) : null}

                <span
                  aria-hidden="true"
                  className="absolute left-2 top-7 h-3 w-3 rounded-full border border-foreground/35 bg-background ring-4 ring-background"
                />

                <section className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-lg font-medium text-foreground/90">
                        {experience.role}
                      </h2>
                      <p className="mt-1 text-sm text-foreground/75">
                        {experience.organization}
                      </p>
                    </div>

                    <p className="font-mono text-xs text-foreground/60 sm:text-right">
                      {experience.start} — {experience.end}
                    </p>
                  </div>

                  {experience.summary ? (
                    <p className="mt-3 text-sm text-foreground/80">
                      {experience.summary}
                    </p>
                  ) : null}

                  {experience.highlights?.length ? (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/80">
                      {experience.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </li>
            );
          })}
        </ol>
      </ScrollReveal>
    </div>
  );
}
