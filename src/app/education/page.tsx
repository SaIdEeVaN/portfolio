import ScrollReveal from "../components/ScrollReveal";

type EducationItem = {
  institution: string;
  detail: string;
  start: string;
  end: string;
  highlights?: string[];
};

export default function Education() {
  const education: EducationItem[] = [
    {
      institution: "Rajalakshmi Engineering College",
      detail: "B.E Computer Science and Engineering (Cyber Security)",
      start: "Aug 2024",
      end: "May 2028",
    },
    {
      institution: "Vivekananda Vidyalaya Jr. College",
      detail: "Schooling",
      start: "Jun 2010",
      end: "Mar 2024",
    },
  ];

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">Education</h1>
          <p className="max-w-2xl text-foreground/75">
            Academic background and qualifications.
          </p>
        </header>
      </ScrollReveal>

      <ScrollReveal delayMs={80}>
        <ol className="relative space-y-4">
          {education.map((item, index) => {
            const isLast = index === education.length - 1;
            return (
              <li
                key={`${item.institution}-${item.start}`}
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
                        {item.institution}
                      </h2>
                      <p className="mt-1 text-sm text-foreground/75">
                        {item.detail}
                      </p>
                    </div>

                    <p className="font-mono text-xs text-foreground/60 sm:text-right">
                      {item.start} — {item.end}
                    </p>
                  </div>

                  {item.highlights?.length ? (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/80">
                      {item.highlights.map((highlight) => (
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
