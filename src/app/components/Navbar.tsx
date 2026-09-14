"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getPage, PAGES, type PageHref } from "../lib/pages";
import { PageLink } from "./PageTransition";
import { PaletteCycleButton } from "./PreferenceControls";

const LINKS: PageHref[] = ["/about", "/experience", "/projects", "/education", "/skills"];

export default function Navbar() {
  const pathname = usePathname();
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
  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <nav className="nav" aria-label="Primary">
      <div className="shell nav__bar">
        <PageLink href="/" className="nav__brand" onNavigate={close} aria-current={current("/")}>
          <span className="nav__brand-full">Baviri Setty Sai Deevan</span>
          <span className="nav__brand-short">Deevan</span>
          <span className="nav__brand-prompt">@portfolio:~$</span>
        </PageLink>

        <ul className="nav__links">
          {LINKS.map((href) => (
            <li key={href}>
              <PageLink href={href} className="nav__link" magnetic aria-current={current(href)}>
                {getPage(href).label}
              </PageLink>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          <PaletteCycleButton />
          <PageLink
            href="/contact"
            className="nav__cta"
            magnetic
            onNavigate={close}
            aria-current={current("/contact")}
          >
            Hire me
          </PageLink>
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
            {PAGES.map((page) => (
              <li key={page.href}>
                <PageLink
                  href={page.href}
                  className="nav__panel-link"
                  onNavigate={close}
                  aria-current={current(page.href)}
                >
                  {page.label}
                </PageLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
