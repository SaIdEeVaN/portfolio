import ScrollReveal from "../components/ScrollReveal";

export default function Skills() {
  const groups: Array<{ title: string; items: string[] }> = [
    { title: "Languages", items: ["C", "C++", "Python", "TypeScript"] },
    { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
    { title: "Backend", items: ["Django", "Django REST Framework"] },
    { title: "Data", items: ["SQL", "MongoDB"] },
  ];

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">Skills</h1>
          <p className="max-w-2xl text-foreground/75">
            Tools and technologies I&apos;m comfortable using.
          </p>
        </header>
      </ScrollReveal>

      <ScrollReveal delayMs={80}>
        <div className="grid gap-4 md:grid-cols-2">
          {groups.map((group) => (
            <section
              key={group.title}
              className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5"
            >
              <p className="font-mono text-xs text-foreground/60">{group.title}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="glass-surface glass-inner-border rounded-md px-3 py-1 text-sm text-foreground/85"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}