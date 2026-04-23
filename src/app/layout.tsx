import "./globals.css";
import InitialLoader from "./components/InitialLoader";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import type { Metadata, Viewport } from "next";

const SITE_NAME = "Baviri Setty Sai Deevan";
const SITE_TITLE = `${SITE_NAME} | Portfolio`;
const SITE_DESCRIPTION =
  "Aspiring software engineer focused on DevOps and cybersecurity. Explore experience, education, skills, and contact details.";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

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
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="relative min-h-screen bg-background text-foreground antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-xl focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 glass-surface glass-inner-border"
        >
          Skip to content
        </a>
        <InitialLoader />
        <div className="app-shell">
          <div className="relative z-10">
            <Navbar />
            <main
              id="content"
              tabIndex={-1}
              className="mx-auto w-full max-w-5xl px-6 py-10"
            >
              <PageTransition>{children}</PageTransition>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}