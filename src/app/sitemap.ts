import type { MetadataRoute } from "next";
import { PAGES } from "./lib/pages";
import { SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return PAGES.map((page) => ({
    url: new URL(page.href, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: page.href === "/" ? 1 : 0.6,
  }));
}
