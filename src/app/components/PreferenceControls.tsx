"use client";

import { useMotion, usePalette } from "../hooks/usePreferences";
import {
  MOTION_LABELS,
  MOTION_MULTIPLIER,
  MOTIONS,
  PALETTE_LABELS,
  PALETTES,
} from "../lib/preferences";

export function PaletteCycleButton() {
  const [palette, setPalette] = usePalette();
  const next = PALETTES[(PALETTES.indexOf(palette) + 1) % PALETTES.length];
  const label = `Palette: ${PALETTE_LABELS[palette]}. Switch to ${PALETTE_LABELS[next]}`;

  return (
    <button
      type="button"
      className="palette-btn"
      data-magnetic=""
      onClick={() => setPalette(next)}
      aria-label={label}
      title={label}
    >
      <span className="palette-btn__swatch" data-accent="a1" />
      <span className="palette-btn__swatch" data-accent="a2" />
      <span className="palette-btn__swatch" data-accent="a3" />
      <span className="palette-btn__swatch" data-accent="a4" />
    </button>
  );
}

export function FooterPreferences() {
  const [palette, setPalette] = usePalette();
  const [motion, setMotion] = useMotion();

  return (
    <div className="prefs">
      <fieldset className="prefs__group">
        <legend className="prefs__legend">Palette</legend>
        <div className="seg">
          {PALETTES.map((option) => (
            <button
              key={option}
              type="button"
              className="seg__btn"
              aria-pressed={palette === option}
              onClick={() => setPalette(option)}
            >
              {PALETTE_LABELS[option]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="prefs__group">
        <legend className="prefs__legend">Motion</legend>
        <div className="seg">
          {MOTIONS.map((option) => (
            <button
              key={option}
              type="button"
              className="seg__btn"
              aria-pressed={motion === option}
              onClick={() => setMotion(option)}
            >
              {MOTION_LABELS[option]}
            </button>
          ))}
        </div>
      </fieldset>

      <p className="prefs__readout">
        palette={palette} motion={motion} ({MOTION_MULTIPLIER[motion]}×)
      </p>
    </div>
  );
}
