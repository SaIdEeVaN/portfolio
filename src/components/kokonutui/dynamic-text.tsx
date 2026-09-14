"use client";

/**
 * Adapted from Kokonut UI's Dynamic Text (MIT) — https://kokonutui.com
 * Original by @dorianbaffier.
 *
 * Flashes a greeting in several languages, then settles on the final text. Screen
 * readers only ever get the final text; Restrained motion and OS reduced motion skip
 * the sequence entirely.
 */

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { READY_EVENT, readMotion, REDUCED_MOTION_QUERY } from "@/app/lib/preferences";
import { cn } from "@/lib/utils";

export interface Greeting {
  text: string;
  lang: string;
}

interface DynamicTextProps {
  greetings: Greeting[];
  finalText: string;
  className?: string;
  intervalMs?: number;
}

export default function DynamicText({
  greetings,
  finalText,
  className,
  intervalMs = 420,
}: DynamicTextProps) {
  // null means the final text is showing.
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    let startTimer = 0;
    let interval = 0;
    let started = false;

    const start = () => {
      if (started || !greetings.length) return;
      started = true;
      if (readMotion() === "restrained" || window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

      let next = 0;
      startTimer = window.setTimeout(() => {
        setIndex(0);
        interval = window.setInterval(() => {
          next += 1;
          if (next >= greetings.length) {
            window.clearInterval(interval);
            setIndex(null);
            return;
          }
          setIndex(next);
        }, intervalMs);
      }, 0);
    };

    // Wait for the intro loader so the sequence isn't hidden underneath it.
    if (document.documentElement.dataset.appReady === "true") {
      start();
    } else {
      window.addEventListener(READY_EVENT, start, { once: true });
    }

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(interval);
      window.removeEventListener(READY_EVENT, start);
    };
  }, [greetings, intervalMs]);

  const greeting = index === null ? null : greetings[index];

  return (
    <span className={cn("dynamic-text", className)}>
      <span className="sr-only">{finalText}</span>
      <span className="dynamic-text__stage" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={greeting ? `greeting-${index}` : "final"}
            lang={greeting?.lang}
            className={greeting ? "dynamic-text__greeting" : "dynamic-text__final"}
            initial={{ y: "0.9em", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-0.9em", opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {greeting ? greeting.text : finalText}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
