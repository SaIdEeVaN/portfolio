"use client";

import { useEffect, useRef } from "react";
import { MOTION_MULTIPLIER, readMotion, REDUCED_MOTION_QUERY } from "../lib/preferences";

type Spring = { x: number; y: number; vx: number; vy: number };

const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

// Cursor follower, magnetic hover ([data-magnetic]) and parallax ([data-parallax]).
export default function MotionLayer() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const reducedQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const springs = new Map<HTMLElement, Spring>();
    const pointer = { x: 0, y: 0, active: false };
    const follower = { x: 0, y: 0, scale: 1, placed: false };
    let hovering = false;
    let frame = 0;
    let parallaxFrame = 0;

    const isInteractive = () =>
      !reducedQuery.matches && finePointerQuery.matches && readMotion() !== "restrained";

    const tick = () => {
      frame = 0;
      const motion = readMotion();
      const multiplier = MOTION_MULTIPLIER[motion];
      const interactive = isInteractive();
      let moving = false;

      if (cursor) {
        if (interactive && pointer.active) {
          if (!follower.placed) {
            follower.x = pointer.x;
            follower.y = pointer.y;
            follower.placed = true;
          }
          const dx = pointer.x - follower.x;
          const dy = pointer.y - follower.y;
          follower.x += dx * 0.2;
          follower.y += dy * 0.2;
          follower.scale += ((hovering ? 1.9 : 1) - follower.scale) * 0.18;

          const distance = Math.hypot(dx, dy);
          const squash = Math.min(distance / 140, 0.45) * Math.min(multiplier, 1.4);
          const angle = Math.atan2(dy, dx);
          cursor.style.transform =
            `translate3d(${follower.x}px, ${follower.y}px, 0) rotate(${angle}rad) ` +
            `scale(${follower.scale * (1 + squash)}, ${follower.scale * (1 - squash * 0.6)})`;
          cursor.dataset.visible = "true";

          if (distance > 0.2 || Math.abs((hovering ? 1.9 : 1) - follower.scale) > 0.01) moving = true;
        } else {
          cursor.dataset.visible = "false";
          follower.placed = false;
        }
      }

      const strength = interactive ? 0.34 * multiplier : 0;
      const limit = 10 + 8 * multiplier;
      const stiffness = motion === "chaotic" ? 0.17 : 0.13;
      const damping = motion === "chaotic" ? 0.8 : 0.72;

      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => {
        let spring = springs.get(element);
        if (!spring) {
          if (!strength || !pointer.active) return;
          spring = { x: 0, y: 0, vx: 0, vy: 0 };
          springs.set(element, spring);
        }

        let targetX = 0;
        let targetY = 0;
        if (strength && pointer.active) {
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2 - spring.x;
          const centerY = rect.top + rect.height / 2 - spring.y;
          const dx = pointer.x - centerX;
          const dy = pointer.y - centerY;
          const radius = Math.max(rect.width, rect.height) / 2 + 40;
          if (Math.hypot(dx, dy) < radius) {
            targetX = clamp(dx * strength, limit);
            targetY = clamp(dy * strength, limit);
          }
        }

        spring.vx = (spring.vx + (targetX - spring.x) * stiffness) * damping;
        spring.vy = (spring.vy + (targetY - spring.y) * stiffness) * damping;
        spring.x += spring.vx;
        spring.y += spring.vy;

        const settled =
          targetX === 0 &&
          targetY === 0 &&
          Math.abs(spring.x) < 0.05 &&
          Math.abs(spring.y) < 0.05 &&
          Math.abs(spring.vx) < 0.05 &&
          Math.abs(spring.vy) < 0.05;

        if (settled) {
          element.style.transform = "";
          springs.delete(element);
        } else {
          element.style.transform = `translate3d(${spring.x.toFixed(2)}px, ${spring.y.toFixed(2)}px, 0)`;
          moving = true;
        }
      });

      if (moving) request();
    };

    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    const updateParallax = () => {
      parallaxFrame = 0;
      const multiplier = reducedQuery.matches ? 0 : Math.min(MOTION_MULTIPLIER[readMotion()], 1.4);
      const scrollY = window.scrollY;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
        const speed = Number(element.dataset.parallax) || 0.25;
        element.style.transform = multiplier
          ? `translate3d(0, ${(scrollY * speed * multiplier).toFixed(1)}px, 0)`
          : "";
      });
    };

    const requestParallax = () => {
      if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(updateParallax);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      request();
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      hovering = Boolean(target?.closest("a, button, [data-magnetic]"));
    };

    const onPointerLeave = () => {
      pointer.active = false;
      request();
    };

    const settingsObserver = new MutationObserver(() => {
      request();
      requestParallax();
    });
    settingsObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", requestParallax, { passive: true });
    reducedQuery.addEventListener("change", requestParallax);
    updateParallax();

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(parallaxFrame);
      settingsObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", requestParallax);
      reducedQuery.removeEventListener("change", requestParallax);
    };
  }, []);

  return <div ref={cursorRef} className="cursor" data-visible="false" aria-hidden="true" />;
}
