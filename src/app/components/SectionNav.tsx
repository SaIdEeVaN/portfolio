"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { readMotion, REDUCED_MOTION_QUERY } from "../lib/preferences";
import { getSection, type SectionId } from "../lib/sections";

type Wipe = { id: SectionId; phase: "in" | "out" };

const WIPE_IN_MS = 480;
const WIPE_HOLD_MS = 140;
const WIPE_OUT_MS = 560;

const SectionNavContext = createContext<(id: SectionId) => void>(() => {});

function jumpTo(target: HTMLElement, behavior: ScrollBehavior) {
  target.scrollIntoView({ behavior, block: "start" });
  target.focus({ preventScroll: true });
}

export function SectionNavProvider({ children }: { children: ReactNode }) {
  const [wipe, setWipe] = useState<Wipe | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const navigate = useCallback((id: SectionId) => {
    const target = document.getElementById(id);
    if (!target) {
      window.location.assign(`/#${id}`);
      return;
    }

    // A wipe is already covering the screen; let it finish.
    if (timers.current.length) return;

    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }

    const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    if (reduced || readMotion() === "restrained") {
      jumpTo(target, reduced ? "instant" : "smooth");
      return;
    }

    const schedule = (callback: () => void, delay: number) => {
      timers.current.push(window.setTimeout(callback, delay));
    };

    setWipe({ id, phase: "in" });
    schedule(() => {
      jumpTo(target, "instant");
      setWipe({ id, phase: "out" });
    }, WIPE_IN_MS + WIPE_HOLD_MS);
    schedule(() => {
      setWipe(null);
      timers.current = [];
    }, WIPE_IN_MS + WIPE_HOLD_MS + WIPE_OUT_MS);
  }, []);

  const section = wipe ? getSection(wipe.id) : null;

  return (
    <SectionNavContext.Provider value={navigate}>
      {children}
      {wipe && section ? (
        <div
          className={`wipe wipe--${wipe.phase}`}
          data-accent={section.accent}
          aria-hidden="true"
        >
          <span className="wipe__label">{section.label}</span>
        </div>
      ) : null}
    </SectionNavContext.Provider>
  );
}

type SectionLinkProps = {
  to: SectionId;
  className?: string;
  children: ReactNode;
  magnetic?: boolean;
  onNavigate?: () => void;
};

export function SectionLink({ to, className, children, magnetic, onNavigate }: SectionLinkProps) {
  const navigate = useContext(SectionNavContext);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    if (!document.getElementById(to)) return;

    event.preventDefault();
    onNavigate?.();
    navigate(to);
  };

  return (
    <a
      href={`/#${to}`}
      className={className}
      data-magnetic={magnetic ? "" : undefined}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
