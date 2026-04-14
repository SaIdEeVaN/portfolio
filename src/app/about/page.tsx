export default function About() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="max-w-2xl text-foreground/75">
          I&apos;m a Computer Science student who enjoys building scalable
          applications, exploring systems, and creating developer tools.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-5">
          <p className="font-mono text-xs text-foreground/60">How I work</p>
          <ul className="mt-3 space-y-2 text-sm text-foreground/80">
            <li>Strong fundamentals, simple solutions.</li>
            <li>Readable code, predictable behavior.</li>
            <li>Performance and DX matter.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-5">
          <p className="font-mono text-xs text-foreground/60">What I build</p>
          <ul className="mt-3 space-y-2 text-sm text-foreground/80">
            <li>Full-stack web apps</li>
            <li>APIs + backend services</li>
            <li>Internal tools and automations</li>
          </ul>
        </div>
      </section>
    </div>
  );
}