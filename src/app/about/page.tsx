import ScrollReveal from "../components/ScrollReveal";

export default function About() {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">About</h1>
          <p className="max-w-2xl text-foreground/75">
            I&apos;m passionate about DevOps and cybersecurity. Most days you&apos;ll
            find me in the Linux CLI (especially Debian) — building, breaking,
            and improving systems until they&apos;re reliable and secure.
          </p>
        </header>
      </ScrollReveal>

      <ScrollReveal delayMs={80}>
        <section className="grid gap-4 md:grid-cols-2">
          <div className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
            <p className="font-mono text-xs text-foreground/60">How I work</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li>Linux-first workflow: terminal, tooling, and automation.</li>
              <li>Security mindset: threat-aware, least privilege, hardening.</li>
              <li>Iterative approach: build → break → fix → improve.</li>
            </ul>
          </div>

          <div className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
            <p className="font-mono text-xs text-foreground/60">What I build</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li>Automation scripts and developer tooling</li>
              <li>CI/CD workflows and deployment setups</li>
              <li>Security-focused projects and experiments</li>
            </ul>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}