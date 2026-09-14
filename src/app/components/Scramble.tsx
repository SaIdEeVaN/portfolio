"use client";

import { useEffect, useRef, useState } from "react";
import { READY_EVENT, readMotion, REDUCED_MOTION_QUERY } from "../lib/preferences";

const GLYPHS = "!<>-_\\/[]{}=+*^?#$%&01";
const FRAMES = 26;
const FRAME_MS = 34;

type ScrambleProps = {
  text: string;
  as?: "p" | "span";
  className?: string;
  // "mount" waits for the intro loader; "view" replays whenever it scrolls into view.
  trigger?: "mount" | "view";
};

export default function Scramble({ text, as: Tag = "span", className, trigger = "mount" }: ScrambleProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [noise, setNoise] = useState<string | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let timer = 0;
    let running = false;
    let cancelled = false;

    const run = () => {
      if (running) return;
      if (readMotion() === "restrained" || window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

      running = true;
      let frame = 0;

      const step = () => {
        if (cancelled) return;
        frame += 1;

        if (frame >= FRAMES) {
          running = false;
          setNoise(null);
          return;
        }

        const settled = Math.floor((frame / FRAMES) * text.length);
        let output = "";
        for (let index = 0; index < text.length; index += 1) {
          const character = text[index];
          output +=
            index < settled || character === " "
              ? character
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setNoise(output);
        timer = window.setTimeout(step, FRAME_MS);
      };

      timer = window.setTimeout(step, 0);
    };

    let observer: IntersectionObserver | undefined;

    if (trigger === "view") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) run();
        },
        { threshold: 0.5 },
      );
      observer.observe(element);
    } else if (document.documentElement.dataset.appReady === "true") {
      run();
    } else {
      window.addEventListener(READY_EVENT, run, { once: true });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      observer?.disconnect();
      window.removeEventListener(READY_EVENT, run);
    };
  }, [text, trigger]);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={["scramble", className].filter(Boolean).join(" ")}
    >
      <span className="scramble__real" style={noise ? { opacity: 0 } : undefined}>
        {text}
      </span>
      {noise ? (
        <span className="scramble__noise" aria-hidden="true">
          {noise}
        </span>
      ) : null}
    </Tag>
  );
}
