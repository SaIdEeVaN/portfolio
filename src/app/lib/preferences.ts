export const PALETTES = ["clash", "acid", "noir"] as const;
export type Palette = (typeof PALETTES)[number];

export const MOTIONS = ["restrained", "springy", "chaotic"] as const;
export type Motion = (typeof MOTIONS)[number];

export const PALETTE_LABELS: Record<Palette, string> = {
  clash: "Clash",
  acid: "Acid",
  noir: "Noir",
};

export const MOTION_LABELS: Record<Motion, string> = {
  restrained: "Restrained",
  springy: "Springy",
  chaotic: "Chaotic",
};

export const MOTION_MULTIPLIER: Record<Motion, number> = {
  restrained: 0.3,
  springy: 1,
  chaotic: 1.9,
};

export const DEFAULT_PALETTE: Palette = "clash";
export const DEFAULT_MOTION: Motion = "springy";

export const PALETTE_STORAGE_KEY = "portfolio-palette";
export const MOTION_STORAGE_KEY = "portfolio-motion";

// Fired once the intro loader has cleared, so hero effects don't play underneath it.
export const READY_EVENT = "portfolio:ready";

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function isOneOf<T extends string>(values: readonly T[], value: string | undefined): value is T {
  return value !== undefined && (values as readonly string[]).includes(value);
}

export function readPalette(): Palette {
  const value = document.documentElement.dataset.palette;
  return isOneOf(PALETTES, value) ? value : DEFAULT_PALETTE;
}

export function readMotion(): Motion {
  const value = document.documentElement.dataset.motion;
  return isOneOf(MOTIONS, value) ? value : DEFAULT_MOTION;
}

// Runs before first paint so the stored palette/motion never flash.
export const PREFERENCES_SCRIPT = `(function(){try{var d=document.documentElement;var p=localStorage.getItem(${JSON.stringify(
  PALETTE_STORAGE_KEY,
)});var m=localStorage.getItem(${JSON.stringify(MOTION_STORAGE_KEY)});if(${JSON.stringify(
  PALETTES,
)}.indexOf(p)<0)p=${JSON.stringify(DEFAULT_PALETTE)};if(${JSON.stringify(
  MOTIONS,
)}.indexOf(m)<0)m=matchMedia(${JSON.stringify(REDUCED_MOTION_QUERY)}).matches?"restrained":${JSON.stringify(
  DEFAULT_MOTION,
)};d.dataset.palette=p;d.dataset.motion=m}catch(e){}})()`;
