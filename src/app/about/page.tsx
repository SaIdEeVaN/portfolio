import ScrollReveal from "../components/ScrollReveal";

export default function About() {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">About</h1>
          <p className="max-w-2xl text-foreground/75">
            I&apos;m a Computer Science student who enjoys building scalable
            applications, exploring systems, and creating developer tools.
          </p>
        </header>
      </ScrollReveal>

      <ScrollReveal delayMs={80}>
        <section className="grid gap-4 md:grid-cols-2">
          <div className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
            <p className="font-mono text-xs text-foreground/60">How I work</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li>Strong fundamentals, simple solutions.</li>
              <li>Readable code, predictable behavior.</li>
              <li>Performance and DX matter.</li>
            </ul>
          </div>

          <div className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
            <p className="font-mono text-xs text-foreground/60">What I build</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li>Full-stack web apps</li>
              <li>APIs + backend services</li>
              <li>Internal tools and automations</li>
            </ul>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}