"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Gauge } from "@/components/charts/gauge";

type ScoreGaugeProps = {
  /** Fill level, 0–100. */
  value: number;
  /** Spoken description, e.g. "CGPA 8.71 out of 10". */
  label: string;
};

// Bklit UI notch gauge, mounted once it scrolls into view so the fill animation is seen.
export default function ScoreGauge({ value, label }: ScoreGaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className="score-gauge chart-theme" role="img" aria-label={label}>
      {isInView ? (
        <Gauge
          orientation="linear"
          value={value}
          totalNotches={40}
          spacing={18}
          linearHeight={30}
          minWidth={160}
          activeFill="var(--ink)"
          inactiveFill="var(--ink)"
          inactiveFillOpacity={0.14}
          enterTransition={prefersReducedMotion ? { duration: 0 } : undefined}
        />
      ) : null}
    </div>
  );
}
