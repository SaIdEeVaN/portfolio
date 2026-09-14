"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  DEFAULT_MOTION,
  DEFAULT_PALETTE,
  MOTION_STORAGE_KEY,
  PALETTE_STORAGE_KEY,
  readMotion,
  readPalette,
  type Motion,
  type Palette,
} from "../lib/preferences";

// The <html> data attributes are the source of truth; React just subscribes to them.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-palette", "data-motion"],
  });
  return () => observer.disconnect();
}

function persist(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode); the choice still applies for this visit.
  }
}

export function usePalette() {
  const palette = useSyncExternalStore(subscribe, readPalette, () => DEFAULT_PALETTE);

  const setPalette = useCallback((next: Palette) => {
    document.documentElement.dataset.palette = next;
    persist(PALETTE_STORAGE_KEY, next);
  }, []);

  return [palette, setPalette] as const;
}

export function useMotion() {
  const motion = useSyncExternalStore(subscribe, readMotion, () => DEFAULT_MOTION);

  const setMotion = useCallback((next: Motion) => {
    document.documentElement.dataset.motion = next;
    persist(MOTION_STORAGE_KEY, next);
  }, []);

  return [motion, setMotion] as const;
}
