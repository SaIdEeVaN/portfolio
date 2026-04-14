export default function Contact() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="max-w-2xl text-foreground/75">
          Want to collaborate or chat? Reach out.
        </p>
      </header>

      <section className="rounded-xl border border-foreground/10 bg-foreground/5 p-5">
        <dl className="space-y-4">
          <div>
            <dt className="font-mono text-xs text-foreground/60">Email</dt>
            <dd className="mt-1 text-sm">
              <a
                className="text-foreground/85 underline underline-offset-4 hover:text-foreground"
                href="mailto:saideevan@gmail.com"
              >
                saideevan@gmail.com
              </a>
            </dd>
          </div>

          <div>
            <dt className="font-mono text-xs text-foreground/60">GitHub</dt>
            <dd className="mt-1 text-sm">
              <a
                className="text-foreground/85 underline underline-offset-4 hover:text-foreground"
                href="https://github.com/SaIdEeVaN"
                target="_blank"
                rel="noreferrer"
              >
                github.com/SaIdEeVaN
              </a>
            </dd>
          </div>

          <div>
            <dt className="font-mono text-xs text-foreground/60">LinkedIn</dt>
            <dd className="mt-1 text-sm">
              <a
                className="text-foreground/85 underline underline-offset-4 hover:text-foreground"
                href="https://linkedin.com/in/baviri-setty-sai-deevan"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/baviri-setty-sai-deevan
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}