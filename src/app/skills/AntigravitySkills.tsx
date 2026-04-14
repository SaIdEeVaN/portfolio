"use client";

import { useEffect, useMemo, useRef } from "react";

type Group = { title: string; items: string[] };

function usePrefersReducedMotion() {
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      prefersReducedMotionRef.current = mediaQuery.matches;
    };

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotionRef;
}

type MotionPoint = { x: number; y: number };

function lerp(current: number, target: number, alpha: number) {
  return current + (target - current) * alpha;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

type AntigravityTagFieldProps = {
  items: string[];
  className?: string;
};

function AntigravityTagField({ items, className }: AntigravityTagFieldProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef<MotionPoint>({ x: 0, y: 0 });
  const isActiveRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const prefersReducedMotionRef = usePrefersReducedMotion();

  const itemNodesRef = useRef<HTMLSpanElement[]>([]);
  const stateByNodeRef = useRef(
    new Map<HTMLSpanElement, { x: number; y: number; tx: number; ty: number }>(),
  );

  const settings = useMemo(() => {
    return {
      // Roughly “Google antigravity”-ish: a soft repulsion field.
      radiusPx: 150,
      maxOffsetPx: 26,
      // Smaller = slower response. (User asked to slow it down a tad.)
      followAlpha: 0.075,
      // Extra softness close to the edge of the radius.
      strengthPower: 1.8,
      settleEpsilon: 0.08,
    } as const;
  }, []);

  const stopLoopIfIdle = () => {
    if (rafIdRef.current == null) return;

    let maxDistance = 0;
    for (const state of stateByNodeRef.current.values()) {
      maxDistance = Math.max(maxDistance, Math.abs(state.x), Math.abs(state.y));
    }

    if (!isActiveRef.current && maxDistance < settings.settleEpsilon) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  };

  const frame = () => {
    rafIdRef.current = requestAnimationFrame(frame);

    if (prefersReducedMotionRef.current) {
      for (const node of itemNodesRef.current) {
        node.style.transform = "";
      }
      isActiveRef.current = false;
      stopLoopIfIdle();
      return;
    }

    const pointer = pointerRef.current;
    const active = isActiveRef.current;

    for (const node of itemNodesRef.current) {
      const state = stateByNodeRef.current.get(node);
      if (!state) continue;

      let targetX = 0;
      let targetY = 0;

      if (active) {
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = centerX - pointer.x;
        const dy = centerY - pointer.y;
        const distance = Math.hypot(dx, dy);

        if (distance > 0 && distance < settings.radiusPx) {
          const unitX = dx / distance;
          const unitY = dy / distance;
          const strengthLinear = (settings.radiusPx - distance) / settings.radiusPx;
          const strength = Math.pow(
            clamp(strengthLinear, 0, 1),
            settings.strengthPower,
          );

          targetX = unitX * settings.maxOffsetPx * strength;
          targetY = unitY * settings.maxOffsetPx * strength;
        }
      }

      state.tx = targetX;
      state.ty = targetY;

      state.x = lerp(state.x, state.tx, settings.followAlpha);
      state.y = lerp(state.y, state.ty, settings.followAlpha);

      node.style.willChange = "transform";
      node.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 0)`;
    }

    stopLoopIfIdle();
  };

  const ensureLoop = () => {
    if (rafIdRef.current != null) return;
    rafIdRef.current = requestAnimationFrame(frame);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = Array.from(
      root.querySelectorAll<HTMLSpanElement>("[data-antigravity-item]"),
    );

    itemNodesRef.current = nodes;
    stateByNodeRef.current.clear();
    for (const node of nodes) {
      stateByNodeRef.current.set(node, { x: 0, y: 0, tx: 0, ty: 0 });
    }

    const reset = () => {
      for (const node of nodes) {
        const state = stateByNodeRef.current.get(node);
        if (state) {
          state.x = 0;
          state.y = 0;
          state.tx = 0;
          state.ty = 0;
        }
        node.style.transform = "";
      }
    };

    const onScrollOrResize = () => {
      // Keep it stable when the page moves underneath.
      if (!isActiveRef.current) reset();
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={className}
      onPointerEnter={(event) => {
        pointerRef.current = { x: event.clientX, y: event.clientY };
        isActiveRef.current = true;
        ensureLoop();
      }}
      onPointerMove={(event) => {
        pointerRef.current = { x: event.clientX, y: event.clientY };
        ensureLoop();
      }}
      onPointerLeave={() => {
        isActiveRef.current = false;
        ensureLoop();
      }}
    >
      {items.map((item) => (
        <span
          key={item}
          data-antigravity-item
          className="glass-surface glass-inner-border rounded-md px-3 py-1 text-sm text-foreground/85"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

type AntigravitySkillsProps = {
  groups: Group[];
};

export default function AntigravitySkills({ groups }: AntigravitySkillsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {groups.map((group) => (
        <section
          key={group.title}
          className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5"
        >
          <p className="font-mono text-xs text-foreground/60">{group.title}</p>
          <AntigravityTagField
            items={group.items}
            className="mt-3 flex flex-wrap gap-2"
          />
        </section>
      ))}
    </div>
  );
}
