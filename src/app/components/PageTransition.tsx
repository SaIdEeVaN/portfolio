"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { findPage } from "../lib/pages";
import { readMotion, REDUCED_MOTION_QUERY } from "../lib/preferences";

type Wipe = {
  href: string;
  path: string;
  hash: string;
  label: string;
  accent: string;
  phase: "in" | "hold" | "out";
};

const WIPE_IN_MS = 480;
const WIPE_HOLD_MS = 120;
const WIPE_OUT_MS = 560;
const ARRIVE_SETTLE_MS = 90;
// If the route never commits (offline, error), uncover the screen anyway.
const NAVIGATION_TIMEOUT_MS = 6000;

// "/projects#bic-rec" → { path: "/projects", hash: "bic-rec" }
function splitHref(href: string) {
  const index = href.indexOf("#");
  if (index === -1) return { path: href, hash: "" };
  return { path: href.slice(0, index), hash: decodeURIComponent(href.slice(index + 1)) };
}

// Returns true when the transition layer has taken over the navigation.
const PageTransitionContext = createContext<(href: string) => boolean>(() => false);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [wipe, setWipe] = useState<Wipe | null>(null);

  const begin = useCallback(
    (href: string) => {
      const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches;
      const { path, hash } = splitHref(href);

      if (!path || path === pathname) {
        // Same page: let the link jump to its anchor, or glide back to the top.
        if (hash) return false;
        window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
        return true;
      }
      if (wipe) return true;
      if (reduced || readMotion() === "restrained") return false;

      const page = findPage(path);
      setWipe({
        href,
        path,
        hash,
        label: page?.label ?? "Loading",
        accent: page?.accent ?? "a1",
        phase: "in",
      });
      return true;
    },
    [pathname, wipe],
  );

  useEffect(() => {
    if (!wipe) return;

    let timer: number;

    if (wipe.phase === "in") {
      timer = window.setTimeout(() => {
        setWipe({ ...wipe, phase: "hold" });
        router.push(wipe.href, { scroll: false });
      }, WIPE_IN_MS + WIPE_HOLD_MS);
    } else if (wipe.phase === "hold") {
      const arrived = pathname === wipe.path;
      timer = window.setTimeout(
        () => {
          const target = wipe.hash ? document.getElementById(wipe.hash) : null;
          if (target) {
            target.scrollIntoView({ behavior: "instant", block: "start" });
          } else {
            window.scrollTo({ top: 0, behavior: "instant" });
          }
          document.getElementById("content")?.focus({ preventScroll: true });
          setWipe({ ...wipe, phase: "out" });
        },
        arrived ? ARRIVE_SETTLE_MS : NAVIGATION_TIMEOUT_MS,
      );
    } else {
      timer = window.setTimeout(() => setWipe(null), WIPE_OUT_MS);
    }

    return () => window.clearTimeout(timer);
  }, [wipe, pathname, router]);

  return (
    <PageTransitionContext.Provider value={begin}>
      {children}
      {wipe ? (
        <div className={`wipe wipe--${wipe.phase}`} data-accent={wipe.accent} aria-hidden="true">
          <span className="wipe__label">{wipe.label}</span>
        </div>
      ) : null}
    </PageTransitionContext.Provider>
  );
}

type PageLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onNavigate"> & {
  href: string;
  magnetic?: boolean;
  onNavigate?: () => void;
};

export function PageLink({ href, magnetic, onNavigate, children, ...rest }: PageLinkProps) {
  const begin = useContext(PageTransitionContext);

  return (
    <Link
      href={href}
      data-magnetic={magnetic ? "" : undefined}
      onNavigate={(event) => {
        onNavigate?.();
        if (begin(href)) event.preventDefault();
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
