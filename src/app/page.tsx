import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <div className="space-y-10">
      <ScrollReveal>
        <section className="space-y-5">
          <p className="font-mono text-sm text-foreground/60">
            Hi, I am Baviri Setty Sai Deevan.
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Aspiring software engineer and lifelong learner.
          </h1>
          <p className="max-w-2xl text-base text-foreground/75 sm:text-lg">
            I enjoy building scalable applications, exploring systems, and cyber security. Currently a Computer Science student, I am passionate about software development and eager to contribute to impactful projects.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/contact"
              className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Contact
            </a>
            <a
              href="/about"
              className="rounded-md border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/10"
            >
              About
            </a>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delayMs={80}>
        <section className="grid gap-4 md:grid-cols-3">
          <div className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
            <p className="font-mono text-xs text-foreground/60">Focus</p>
            <p className="mt-2 text-sm text-foreground/80">
              Systems, Devops, Cyber Security, and Full-stack web development.
            </p>
          </div>
          <div className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
            <p className="font-mono text-xs text-foreground/60">Stack</p>
            <p className="mt-2 text-sm text-foreground/80">
              React / Next.js, Django, Python, C/C++, SQL, Tailwind CSS.
            </p>
          </div>
          <div className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
            <p className="font-mono text-xs text-foreground/60">Currently</p>
            <p className="mt-2 text-sm text-foreground/80">
              Iterating on this portfolio and shipping projects.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delayMs={120}>
        <section className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
          <p className="mb-3 font-mono text-xs text-foreground/60">Status</p>
          <div className="space-y-1 font-mono text-sm text-foreground/80">
            <p>$ initializing portfolio...</p>
            <p>$ loading projects...</p>
            <p>$ ready</p>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}