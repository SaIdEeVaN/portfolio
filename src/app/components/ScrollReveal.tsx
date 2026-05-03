"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type RevealCallback = () => void;

let sharedObserver: IntersectionObserver | null = null;
const sharedCallbacks = new WeakMap<Element, RevealCallback>();

function getSharedObserver() {
  if (sharedObserver) return sharedObserver;
  if (typeof window === "undefined") return null;
  if (typeof IntersectionObserver === "undefined") return null;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const callback = sharedCallbacks.get(entry.target);
        if (callback) callback();

        sharedCallbacks.delete(entry.target);
        sharedObserver?.unobserve(entry.target);
      }
    },
    { root: null, threshold: 0.15, rootMargin: "-10% 0px -10% 0px" },
  );

  return sharedObserver;
}

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
};

export default function ScrollReveal({
  children,
  className,
  delayMs = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldReveal = prefersReducedMotion || isVisible;

  useEffect(() => {
    if (prefersReducedMotion || isVisible) return;

    const element = ref.current;
    if (!element) return;

    const observer = getSharedObserver();
    if (!observer) {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    sharedCallbacks.set(element, () => setIsVisible(true));
    observer.observe(element);

    return () => {
      sharedCallbacks.delete(element);
      observer.unobserve(element);
    };
  }, [prefersReducedMotion, isVisible]);

  const style = delayMs ? ({ transitionDelay: `${delayMs}ms` } as const) : undefined;

  return (
    <div
      ref={ref}
      className={["reveal", shouldReveal ? "reveal--in" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
