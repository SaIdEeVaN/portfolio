export const PAGES = [
  {
    href: "/",
    slug: "home",
    label: "Home",
    accent: "a1",
    blurb: "Who I am and what I'm working on.",
  },
  {
    href: "/about",
    slug: "about",
    label: "About",
    accent: "a3",
    blurb: "How I work and what I build.",
  },
  {
    href: "/experience",
    slug: "experience",
    label: "Experience",
    accent: "a4",
    blurb: "A short timeline of roles and responsibilities.",
  },
  {
    href: "/projects",
    slug: "projects",
    label: "Projects",
    accent: "a2",
    blurb: "The Blockchain Innovation Club website and VoicePath.",
  },
  {
    href: "/education",
    slug: "education",
    label: "Education",
    accent: "a1",
    blurb: "Academic background and qualifications.",
  },
  {
    href: "/skills",
    slug: "skills",
    label: "Skills",
    accent: "ink",
    blurb: "Tools and technologies I'm comfortable using.",
  },
  {
    href: "/contact",
    slug: "contact",
    label: "Contact",
    accent: "a2",
    blurb: "Want to collaborate or chat? Reach out.",
  },
] as const;

export type SitePage = (typeof PAGES)[number];
export type PageHref = SitePage["href"];

export function getPage(href: PageHref): SitePage {
  return PAGES.find((page) => page.href === href) ?? PAGES[0];
}

export function findPage(href: string): SitePage | undefined {
  return PAGES.find((page) => page.href === href);
}

export function getNextPage(href: PageHref): SitePage {
  const index = PAGES.findIndex((page) => page.href === href);
  return PAGES[(index + 1) % PAGES.length];
}
