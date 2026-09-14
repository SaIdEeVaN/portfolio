"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { Ring } from "@/components/charts/ring";
import { RingCenter } from "@/components/charts/ring-center";
import { RingChart } from "@/components/charts/ring-chart";
import type { ProjectLanguage } from "../lib/projects";

const RING_COLORS = ["var(--a2)", "var(--a3)", "var(--a4)", "var(--a1)", "var(--ink)"];

function formatShare(percent: number) {
  return percent < 0.1 ? "<0.1%" : `${percent.toFixed(1)}%`;
}

type LanguageRingProps = {
  languages: ProjectLanguage[];
  source: string;
};

// Bklit UI ring chart with a legend that doubles as the accessible version of the data.
export default function LanguageRing({ languages, source }: LanguageRingProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, margin: "0px 0px -15% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const totalBytes = languages.reduce((sum, language) => sum + language.bytes, 0);
  const data = languages.map((language, index) => ({
    label: language.name,
    value: language.bytes,
    maxValue: totalBytes,
    color: RING_COLORS[index % RING_COLORS.length],
  }));

  return (
    <div className="languages">
      <div ref={chartRef} className="languages__chart chart-theme" aria-hidden="true">
        {isInView ? (
          <RingChart
            data={data}
            size={300}
            strokeWidth={12}
            ringGap={4}
            baseInnerRadius={64}
            hoveredIndex={hoveredIndex}
            onHoverChange={setHoveredIndex}
            enterTransition={prefersReducedMotion ? { duration: 0 } : undefined}
          >
            {data.map((item, index) => (
              <Ring
                key={item.label}
                index={index}
                lineCap="butt"
                showGlow={false}
                animate={!prefersReducedMotion}
              />
            ))}
            <RingCenter
              defaultLabel="bytes of code"
              formatOptions={{ notation: "compact", maximumFractionDigits: 0 }}
              valueClassName="languages__center-value"
              labelClassName="languages__center-label"
            />
          </RingChart>
        ) : null}
      </div>

      <ul className="languages__legend">
        {languages.map((language, index) => (
          <li
            key={language.name}
            className="languages__row"
            data-active={hoveredIndex === index ? "" : undefined}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span
              className="languages__swatch"
              style={{ background: RING_COLORS[index % RING_COLORS.length] }}
              aria-hidden="true"
            />
            <span className="languages__name">{language.name}</span>
            <span className="languages__share">
              {formatShare((language.bytes / totalBytes) * 100)}
            </span>
          </li>
        ))}
      </ul>

      <p className="languages__note">{source}</p>
    </div>
  );
}
