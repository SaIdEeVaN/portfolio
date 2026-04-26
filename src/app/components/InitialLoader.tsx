"use client";

import { useEffect, useState } from "react";

export default function InitialLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    delete document.documentElement.dataset.appReady;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      document.documentElement.dataset.appReady = "true";
      setTimeout(() => setIsVisible(false), 0);
      return;
    }

    const startExitTimer = window.setTimeout(() => {
      document.documentElement.dataset.appReady = "true";
      setIsExiting(true);
    }, 1650);

    const removeTimer = window.setTimeout(() => setIsVisible(false), 2450);

    return () => {
      window.clearTimeout(startExitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={
        "loader-overlay fixed inset-0 z-[100] grid place-items-center bg-background text-foreground" +
        (isExiting ? " loader-exit pointer-events-none" : "")
      }
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="relative">
        <div
          className={
            "loader-card glass-surface glass-highlight glass-inner-border loader-scan w-[min(92vw,460px)] rounded-2xl px-7 py-6" +
            (isExiting ? " loader-card--exit" : "")
          }
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-foreground/60">booting…</p>
              <p className="mt-2 text-lg font-semibold tracking-tight">
                Baviri Setty Sai Deevan
              </p>
              <p className="mt-1 text-sm text-foreground/75">Loading portfolio</p>
            </div>

            <span
              className="mt-1 h-5 w-5 rounded-full border-2 border-foreground/20 border-t-foreground/70 motion-reduce:border-t-foreground/20 motion-safe:animate-spin"
              aria-hidden="true"
            />
          </div>

          <div className="mt-5 rounded-xl border border-foreground/10 bg-foreground/5 p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-foreground/60">Initializing UI</span>
              <span className="font-mono text-[11px] text-foreground/55">v0.1</span>
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
    </div>
  );
}

