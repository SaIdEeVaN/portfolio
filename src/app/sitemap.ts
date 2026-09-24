import type { MetadataRoute } from "next";
import { PAGES } from "./lib/pages";
import { PROJECTS, projectHref } from "./lib/projects";
import { SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = PAGES.map((page) => ({
    url: new URL(page.href, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: page.href === "/" ? 1 : 0.6,
  }));

  const projects: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: new URL(projectHref(project), SITE_URL).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...pages, ...projects];
}
