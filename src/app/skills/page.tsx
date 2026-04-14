export default function Skills() {
  const groups: Array<{ title: string; items: string[] }> = [
    { title: "Languages", items: ["C", "C++", "Python", "TypeScript"] },
    { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
    { title: "Backend", items: ["Django", "Django REST Framework"] },
    { title: "Data", items: ["SQL", "MongoDB"] },
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Skills</h1>
        <p className="max-w-2xl text-foreground/75">
          Tools and technologies I&apos;m comfortable using.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <section
            key={group.title}
            className="rounded-xl border border-foreground/10 bg-foreground/5 p-5"
          >
            <p className="font-mono text-xs text-foreground/60">{group.title}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-foreground/15 bg-background/60 px-3 py-1 text-sm text-foreground/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}