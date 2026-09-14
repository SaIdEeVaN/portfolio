import type { Metadata } from "next";
import NextPage from "../components/NextPage";
import PageHeader from "../components/PageHeader";
import ScrollReveal from "../components/ScrollReveal";
import { getPage } from "../lib/pages";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "How Baviri Setty Sai Deevan works: a Linux-first workflow, a security mindset, and an iterative approach to DevOps and cybersecurity projects.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        page={getPage("/about")}
        lede="I'm passionate about DevOps and cybersecurity. I spend most of my time in the Linux CLI (especially Debian) — building, breaking, and improving."
      />

      <section className="page-body">
        <div className="shell">
          <div className="about__grid">
            <ScrollReveal className="card">
              <h2 className="card__title">How I work</h2>
              <ul className="card__list">
                <li>Linux-first workflow: terminal, tooling, and automation.</li>
                <li>Security mindset: threat-aware, least privilege, hardening.</li>
                <li>Iterative approach: build → break → fix → improve.</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal className="card" delayMs={90}>
              <h2 className="card__title">What I build</h2>
              <ul className="card__list">
                <li>Automation scripts and developer tooling</li>
                <li>CI/CD workflows and deployment setups</li>
                <li>Security-focused projects and experiments</li>
              </ul>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <p className="quote" aria-hidden="true">
              build → break → fix → improve
            </p>
          </ScrollReveal>
        </div>
      </section>

      <NextPage current="/about" />
    </>
  );
}
