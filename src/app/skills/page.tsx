import ScrollReveal from "../components/ScrollReveal";
import AntigravitySkills from "./AntigravitySkills";

export default function Skills() {
  const groups: Array<{ title: string; items: string[] }> = [
    { title: "Languages", items: ["C", "C++", "Python", "TypeScript"] },
    { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
    { title: "Backend", items: ["Django", "Django REST Framework"] },
    { title: "Data", items: ["MySQL", "MongoDB"] },
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
        <AntigravitySkills groups={groups} />
      </ScrollReveal>
    </div>
  );
}