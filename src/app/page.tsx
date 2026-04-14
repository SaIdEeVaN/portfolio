export default function Home() {
  return (
    <div className="space-y-10">
      <section className="space-y-5">
        <p className="font-mono text-sm text-foreground/60">Hi, I’m Sai.</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Developer building clean, reliable web apps.
        </h1>
        <p className="max-w-2xl text-base text-foreground/75 sm:text-lg">
          I like working across the stack: front-end UI, APIs, databases, and
          the little details that make products feel solid.
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

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-5">
          <p className="font-mono text-xs text-foreground/60">Focus</p>
          <p className="mt-2 text-sm text-foreground/80">
            Systems, web apps, and developer tooling.
          </p>
        </div>
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-5">
          <p className="font-mono text-xs text-foreground/60">Stack</p>
          <p className="mt-2 text-sm text-foreground/80">
            React / Next.js, Python, Django, SQL.
          </p>
        </div>
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-5">
          <p className="font-mono text-xs text-foreground/60">Currently</p>
          <p className="mt-2 text-sm text-foreground/80">
            Iterating on this portfolio and shipping projects.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-foreground/10 bg-foreground/5 p-5">
        <p className="mb-3 font-mono text-xs text-foreground/60">Status</p>
        <div className="space-y-1 font-mono text-sm text-foreground/80">
          <p>$ initializing portfolio...</p>
          <p>$ loading projects...</p>
          <p>$ ready</p>
        </div>
      </section>
    </div>
  );
}