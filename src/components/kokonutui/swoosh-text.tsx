"use client";

/**
 * Adapted from Kokonut UI's Swoosh Text (MIT) — https://kokonutui.com
 * Original by @dorianbaffier.
 *
 * Layered offset shadows in the page's palette colors that collapse flat on hover.
 * The shadow offset is a CSS variable Motion springs to 0, so the palette colors
 * (which are themselves CSS variables) never need to be interpolated.
 */

import { motion, type TargetAndTransition } from "motion/react";
import { cn } from "@/lib/utils";

interface SwooshTextProps {
  text: string;
  className?: string;
}

const RAISED = { "--swoosh-step": "0.035em" } as TargetAndTransition;
const FLAT = { "--swoosh-step": "0em" } as TargetAndTransition;

export default function SwooshText({ text, className }: SwooshTextProps) {
  return (
    <motion.span
      className={cn("swoosh-text", className)}
      initial={RAISED}
      whileHover={FLAT}
      transition={{ type: "spring", stiffness: 520, damping: 30 }}
    >
      {text}
    </motion.span>
  );
}
