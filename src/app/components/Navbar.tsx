"use client";

import { useEffect, useState } from "react";
import { getSection, SECTIONS, type SectionId } from "../lib/sections";
import { PaletteCycleButton } from "./PreferenceControls";
import { SectionLink } from "./SectionNav";

const LINKS: SectionId[] = ["about", "experience", "education", "skills"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <nav className="nav" aria-label="Primary">
      <div className="shell nav__bar">
        <SectionLink to="home" className="nav__brand" onNavigate={close}>
          <span className="nav__brand-full">Baviri Setty Sai Deevan</span>
          <span className="nav__brand-short">Deevan</span>
          <span className="nav__brand-prompt">@portfolio:~$</span>
        </SectionLink>

        <ul className="nav__links">
          {LINKS.map((id) => (
            <li key={id}>
              <SectionLink to={id} className="nav__link" magnetic>
                {getSection(id).label}
              </SectionLink>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          <PaletteCycleButton />
          <SectionLink to="contact" className="nav__cta" magnetic onNavigate={close}>
            Hire me
          </SectionLink>
          <button
            type="button"
            className="nav__menu-btn"
            aria-expanded={isOpen}
            aria-controls="nav-panel"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div id="nav-panel" className="nav__panel">
          <ul className="shell nav__panel-list">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <SectionLink to={section.id} className="nav__panel-link" onNavigate={close}>
                  {section.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
