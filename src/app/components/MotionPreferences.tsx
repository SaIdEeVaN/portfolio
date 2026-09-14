"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { useMotion } from "../hooks/usePreferences";

// Restrained motion turns off Motion's transform and layout animations site-wide;
// otherwise the visitor's OS reduced-motion setting decides.
export default function MotionPreferences({ children }: { children: ReactNode }) {
  const [motion] = useMotion();

  return (
    <MotionConfig reducedMotion={motion === "restrained" ? "always" : "user"}>
      {children}
    </MotionConfig>
  );
}
