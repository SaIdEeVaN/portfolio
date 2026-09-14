import "./globals.css";
import { Archivo_Black, Instrument_Serif, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Footer from "./components/Footer";
import InitialLoader from "./components/InitialLoader";
import MotionLayer from "./components/MotionLayer";
import Navbar from "./components/Navbar";
import { SectionNavProvider } from "./components/SectionNav";
import { DEFAULT_MOTION, DEFAULT_PALETTE, PREFERENCES_SCRIPT } from "./lib/preferences";
import type { Metadata, Viewport } from "next";

const displayFont = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const serifFont = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const SITE_NAME = "Baviri Setty Sai Deevan";
const SITE_TITLE = `${SITE_NAME} | Portfolio`;
const SITE_DESCRIPTION =
  "Aspiring software engineer focused on DevOps and cybersecurity. Explore experience, education, skills, and contact details.";

function normalizeSiteUrl(rawUrl: string) {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "http://localhost:3000";

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("//")) return `https:${trimmed}`;

  return `https://${trimmed}`;
}

const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const SITE_URL = normalizeSiteUrl(RAW_SITE_URL);

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/twitter-image"],
  },
  keywords: [
    "portfolio",
    "DevOps",
    "cybersecurity",
    "Next.js",
    "React",
    "Linux",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F1E8",
};

// Without JavaScript, skip the loader and show content that would otherwise reveal on scroll.
const NO_SCRIPT_STYLES =
  "<style>.loader{display:none!important}.reveal{opacity:1!important;translate:none!important;rotate:none!important}</style>";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    sameAs: [
      "https://github.com/SaIdEeVaN",
      "https://linkedin.com/in/bavirisetty-sai-deevan",
    ],
  };

  return (
    <html
      lang="en"
      data-palette={DEFAULT_PALETTE}
      data-motion={DEFAULT_MOTION}
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} ${serifFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREFERENCES_SCRIPT }} />
      </head>
      <body>
        <noscript dangerouslySetInnerHTML={{ __html: NO_SCRIPT_STYLES }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <SectionNavProvider>
          <InitialLoader />
          <MotionLayer />
          <Navbar />
          <main id="content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </SectionNavProvider>
      </body>
    </html>
  );
}
