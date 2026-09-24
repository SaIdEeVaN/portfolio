import type { Metadata } from "next";

export const SITE_NAME = "Baviri Setty Sai Deevan";
export const SITE_TITLE = `${SITE_NAME} | Portfolio`;
export const SITE_DESCRIPTION =
  "Aspiring software engineer focused on DevOps and cybersecurity. Explore experience, projects, education, skills, and contact details.";

function normalizeSiteUrl(rawUrl: string) {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "http://localhost:3000";

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("//")) return `https:${trimmed}`;

  return `https://${trimmed}`;
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
);

export const SOCIAL_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
};

// Per-page metadata. openGraph/twitter are replaced (not merged) per segment, so repeat the shared fields.
// A page with its own opengraph-image and twitter-image routes (a project) passes its path as imagePath.
export function pageMetadata({
  title,
  description,
  path,
  imagePath = "",
}: {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          ...SOCIAL_IMAGE,
          url: `${imagePath}/opengraph-image`,
          alt: imagePath ? fullTitle : SOCIAL_IMAGE.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${imagePath}/twitter-image`],
    },
  };
}
