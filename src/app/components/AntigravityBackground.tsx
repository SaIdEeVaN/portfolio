"use client";

import { useEffect, useMemo, useRef } from "react";

type Vec2 = { x: number; y: number };

type Particle = {
  base: Vec2;
  pos: Vec2;
  vel: Vec2;
  radius: number;
  alpha: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(input: string): { r: number; g: number; b: number } | null {
  const value = input.trim();
  const hex = value.startsWith("#") ? value.slice(1) : value;
  if (hex.length === 3) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
    return { r, g, b };
  }
  if (hex.length === 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
    return { r, g, b };
  }
  return null;
}

function usePrefersReducedMotionRef() {
  const ref = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      ref.current = mediaQuery.matches;
    };

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return ref;
}

export default function AntigravityBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const lastTsRef = useRef<number>(0);

  const pointerRef = useRef<Vec2>({ x: 0, y: 0 });
  const pointerActiveRef = useRef(false);
  const particlesRef = useRef<Particle[]>([]);

  const prefersReducedMotionRef = usePrefersReducedMotionRef();

  const settings = useMemo(() => {
    return {
      // Background field – tuned to be subtle behind your glass UI.
      count: 84,
      minRadius: 1.2,
      maxRadius: 3.8,
      // Repulsion – “antigravity” feel.
      repulseRadius: 180,
      repulseStrength: 680,
      // Soft spring back to base positions.
      spring: 0.016,
      // Lower = slower motion (user asked to slow it down a tad).
      damping: 0.88,
      // Minor ambient drift so it doesn’t feel frozen.
      drift: 0.028,
      // Rendering.
      clearAlpha: 1,
      settleEpsilon: 0.04,
    } as const;
  }, []);

  const stopLoopIfIdle = () => {
    if (rafIdRef.current == null) return;

    if (pointerActiveRef.current) return;

    let maxSpeed = 0;
    for (const p of particlesRef.current) {
      maxSpeed = Math.max(maxSpeed, Math.abs(p.vel.x), Math.abs(p.vel.y));
    }

    if (maxSpeed < settings.settleEpsilon) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  };

  const ensureLoop = () => {
    if (rafIdRef.current != null) return;
    lastTsRef.current = 0;
    rafIdRef.current = requestAnimationFrame(frame);
  };

  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];

    for (let i = 0; i < settings.count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius =
        settings.minRadius +
        Math.random() * (settings.maxRadius - settings.minRadius);
      const alpha = 0.05 + Math.random() * 0.14;

      particles.push({
        base: { x, y },
        pos: { x, y },
        vel: { x: 0, y: 0 },
        radius,
        alpha,
      });
    }

    particlesRef.current = particles;
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const width = Math.floor(window.innerWidth);
    const height = Math.floor(window.innerHeight);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initParticles(width, height);
  };

  const frame = (ts: number) => {
    rafIdRef.current = requestAnimationFrame(frame);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (prefersReducedMotionRef.current) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pointerActiveRef.current = false;
      stopLoopIfIdle();
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    const prev = lastTsRef.current || ts;
    const dtMs = clamp(ts - prev, 0, 32);
    lastTsRef.current = ts;
    const dt = dtMs / 16.67;

    const computed = getComputedStyle(document.documentElement);
    const fgRaw = computed.getPropertyValue("--foreground");
    const fg = hexToRgb(fgRaw) ?? { r: 23, g: 23, b: 23 };

    // Clear.
    ctx.clearRect(0, 0, width, height);
    if (settings.clearAlpha !== 1) {
      ctx.fillStyle = `rgba(${fg.r}, ${fg.g}, ${fg.b}, ${1 - settings.clearAlpha})`;
      ctx.fillRect(0, 0, width, height);
    }

    const pointer = pointerRef.current;
    const isPointerActive = pointerActiveRef.current;

    // Simulate.
    for (const p of particlesRef.current) {
      // Spring to base.
      const axSpring = (p.base.x - p.pos.x) * settings.spring;
      const aySpring = (p.base.y - p.pos.y) * settings.spring;

      let ax = axSpring;
      let ay = aySpring;

      // Repulsion.
      if (isPointerActive) {
        const dx = p.pos.x - pointer.x;
        const dy = p.pos.y - pointer.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 0.001 && dist < settings.repulseRadius) {
          const t = (settings.repulseRadius - dist) / settings.repulseRadius;
          const strength = settings.repulseStrength * t * t;
          ax += (dx / dist) * strength;
          ay += (dy / dist) * strength;
        }
      }

      // Ambient drift.
      if (isPointerActive) {
        ax += (Math.random() - 0.5) * settings.drift;
        ay += (Math.random() - 0.5) * settings.drift;
      }

      p.vel.x = (p.vel.x + ax * dt) * settings.damping;
      p.vel.y = (p.vel.y + ay * dt) * settings.damping;

      p.pos.x += p.vel.x * dt;
      p.pos.y += p.vel.y * dt;

      // Wrap edges softly.
      if (p.pos.x < -20) p.pos.x = width + 20;
      if (p.pos.x > width + 20) p.pos.x = -20;
      if (p.pos.y < -20) p.pos.y = height + 20;
      if (p.pos.y > height + 20) p.pos.y = -20;
    }

    // Render.
    for (const p of particlesRef.current) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(${fg.r}, ${fg.g}, ${fg.b}, ${p.alpha})`;
      ctx.arc(p.pos.x, p.pos.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    stopLoopIfIdle();
  };

  useEffect(() => {
    resizeCanvas();

    const onResize = () => {
      resizeCanvas();
      ensureLoop();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      pointerActiveRef.current = true;
      ensureLoop();
    };

    const onMouseOut = (event: MouseEvent) => {
      // If relatedTarget is null, the pointer left the window/document.
      if (event.relatedTarget == null) {
        pointerActiveRef.current = false;
        ensureLoop();
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseout", onMouseOut);
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
