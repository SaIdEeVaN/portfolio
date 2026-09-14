"use client";

import { useEffect, useState } from "react";
import { READY_EVENT, readMotion, REDUCED_MOTION_QUERY } from "../lib/preferences";

type Phase = "loading" | "exiting" | "done";

const EXIT_AFTER_MS = 1100;
const EXIT_DURATION_MS = 700;

export default function InitialLoader() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const root = document.documentElement;
    const markReady = () => {
      root.dataset.appReady = "true";
      window.dispatchEvent(new Event(READY_EVENT));
    };

    // Restrained motion hides the loader in CSS before paint; just unblock the page.
    if (readMotion() === "restrained" || window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      const timer = window.setTimeout(() => {
        markReady();
        setPhase("done");
      }, 0);
      return () => window.clearTimeout(timer);
    }

    const exitTimer = window.setTimeout(() => {
      setPhase("exiting");
      markReady();
    }, EXIT_AFTER_MS);
    const doneTimer = window.setTimeout(() => setPhase("done"), EXIT_AFTER_MS + EXIT_DURATION_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`loader${phase === "exiting" ? " loader--exit" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="loader__card">
        <p className="eyebrow eyebrow--path">booting ~/portfolio</p>
        <p className="loader__name">
          <span>Baviri Setty</span>
          <span>Sai Deevan</span>
        </p>
        <div className="loader__bar" aria-hidden="true">
          <span className="loader__fill" />
        </div>
        <p className="loader__status">Loading portfolio</p>
      </div>
    </div>
  );
}
