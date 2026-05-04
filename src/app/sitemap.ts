import type { MetadataRoute } from "next";

function normalizeSiteUrl(rawUrl: string) {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "http://localhost:3000";

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("//")) return `https:${trimmed}`;

  return `https://${trimmed}`;
}

function getSiteUrl() {
  const rawUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
  );

  return normalizeSiteUrl(rawUrl);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  const routes = [
    "/",
    "/about",
    "/experience",
    "/education",
    "/skills",
    "/contact",
  ];

  return routes.map((route) => ({
    url: new URL(route, baseUrl).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.6,
  }));
}
