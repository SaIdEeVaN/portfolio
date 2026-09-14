"use client";

import { AnimatePresence, motion, stagger, type Variants } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getPage, PAGES, type PageHref } from "../lib/pages";
import { PageLink } from "./PageTransition";
import { PaletteCycleButton } from "./PreferenceControls";
import ScrollProgress from "./ScrollProgress";

const LINKS: PageHref[] = ["/about", "/experience", "/projects", "/education", "/skills"];

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const;

const PANEL_VARIANTS: Variants = {
  closed: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.22, ease: EASE_OUT },
  },
  open: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.32, ease: EASE_OUT, delayChildren: stagger(0.045) },
  },
};

const PANEL_ITEM_VARIANTS: Variants = {
  closed: { opacity: 0, x: -28 },
  open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 420, damping: 28 } },
};

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  // The marker moves on click, while the wipe is still covering the page, instead of
  // waiting for the route to commit underneath it.
  const [pending, setPending] = useState<{ href: string; from: string } | null>(null);
  const markerHref = pending && pending.from === pathname ? pending.href : pathname;

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const startNavigation = (href: string) => {
    setIsOpen(false);
    setPending({ href, from: pathname });
  };
  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <nav className="nav" aria-label="Primary">
      <div className="shell nav__bar">
        <PageLink
          href="/"
          className="nav__brand"
          onNavigate={() => startNavigation("/")}
          aria-current={current("/")}
        >
          <span className="nav__brand-full">Baviri Setty Sai Deevan</span>
          <span className="nav__brand-short">Deevan</span>
          <span className="nav__brand-prompt">@portfolio:~$</span>
        </PageLink>

        <ul className="nav__links">
          {LINKS.map((href) => (
            <li key={href}>
              <PageLink
                href={href}
                className="nav__link"
                magnetic
                aria-current={current(href)}
                onNavigate={() => startNavigation(href)}
              >
                {markerHref === href ? (
                  <motion.span
                    layoutId="nav-marker"
                    className="nav__marker"
                    transition={{ type: "spring", stiffness: 520, damping: 36 }}
                  />
                ) : null}
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
            onNavigate={() => startNavigation("/contact")}
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

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="nav-panel"
            id="nav-panel"
            className="nav__panel"
            initial="closed"
            animate="open"
            exit="closed"
            variants={PANEL_VARIANTS}
          >
            <ul className="shell nav__panel-list">
              {PAGES.map((page) => (
                <motion.li key={page.href} variants={PANEL_ITEM_VARIANTS}>
                  <PageLink
                    href={page.href}
                    className="nav__panel-link"
                    onNavigate={() => startNavigation(page.href)}
                    aria-current={current(page.href)}
                  >
                    {page.label}
                  </PageLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <ScrollProgress />
    </nav>
  );
}
