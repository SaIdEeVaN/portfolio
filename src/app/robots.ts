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

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();
  const host = new URL(baseUrl).host;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", baseUrl).toString(),
    host,
  };
}
