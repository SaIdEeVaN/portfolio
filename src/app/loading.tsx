export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="loader-card glass-surface glass-highlight glass-inner-border loader-scan w-[min(92vw,460px)] rounded-2xl px-7 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-foreground/60">loading…</p>
            <p className="mt-2 text-lg font-semibold tracking-tight">Preparing content</p>
            <p className="mt-1 text-sm text-foreground/75">Just a moment</p>
          </div>

          <span
            className="mt-1 h-5 w-5 rounded-full border-2 border-foreground/20 border-t-foreground/70 motion-reduce:border-t-foreground/20 motion-safe:animate-spin"
            aria-hidden="true"
          />
        </div>

        <div className="mt-5 rounded-xl border border-foreground/10 bg-foreground/5 p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-foreground/60">Streaming UI</span>
            <span className="font-mono text-[11px] text-foreground/55">Next.js</span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full border border-foreground/10 bg-background/40">
            <div
              className="h-full w-[45%] rounded-full bg-foreground/25 motion-safe:animate-[loader-bar_1.15s_ease-in-out_infinite]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
