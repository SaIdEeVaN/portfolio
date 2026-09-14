import DynamicText, { type Greeting } from "@/components/kokonutui/dynamic-text";
import Scramble from "./components/Scramble";
import ScrollReveal from "./components/ScrollReveal";
import { PageLink } from "./components/PageTransition";
import { SkillsMarquee } from "./components/SkillsLogoGrid";
import { PAGES } from "./lib/pages";
import { PROJECTS } from "./lib/projects";

const HERO_INTRO =
  "I'm passionate about DevOps and cybersecurity. Most days you'll find me in the Linux CLI (especially Debian) — building, breaking, and improving systems until they're reliable and secure.";

// The languages VoicePath supports.
const GREETINGS: Greeting[] = [
  { text: "Hello", lang: "en" },
  { text: "வணக்கம்", lang: "ta" },
  { text: "नमस्ते", lang: "hi" },
];

const SNAPSHOT = [
  { label: "Focus", value: "Systems, DevOps, cybersecurity, and Linux." },
  { label: "Stack", value: "React / Next.js, Django, Python, C/C++, SQL, Tailwind CSS." },
  { label: "Currently", value: "Learning, building projects, and improving this portfolio." },
] as const;

function SectionHead({ path, title, lede }: { path: string; title: string; lede: string }) {
  return (
    <ScrollReveal className="section-head">
      <p className="eyebrow eyebrow--path">~/{path}</p>
      <h2 className="section-head__title">{title}</h2>
      <p className="section-head__lede">{lede}</p>
    </ScrollReveal>
  );
}

export default function Home() {
  const featured = PROJECTS[0];

  return (
    <>
      <section className="hero">
        <div className="shell hero__inner">
          <div className="hero__deco" aria-hidden="true">
            <span className="deco deco--one" data-parallax="0.3" />
            <span className="deco deco--two" data-parallax="0.25">
              &gt;_
            </span>
            <span className="deco deco--three" data-parallax="0.28" />
          </div>

          <p className="eyebrow hero__eyebrow">
            <DynamicText greetings={GREETINGS} finalText="Hi, I am Baviri Setty Sai Deevan." />
          </p>

          <h1 className="hero__name" aria-label="Baviri Setty Sai Deevan">
            <span className="hero__line">Baviri</span>
            <span className="hero__line">
              <span className="hero__slab">Setty</span>
            </span>
            <span className="hero__line">
              <em className="hero__serif">sai</em> Deevan
            </span>
          </h1>

          <p className="hero__tagline">Aspiring software engineer and lifelong learner.</p>
          <Scramble as="p" className="hero__intro" text={HERO_INTRO} />

          <div className="hero__actions">
            <PageLink href="/contact" className="btn btn--a1" magnetic>
              Get in touch
            </PageLink>
            <PageLink href="/projects" className="btn" magnetic>
              See projects
            </PageLink>
            <p className="status">
              <span className="status-dot" aria-hidden="true" />
              Technology Executive, Blockchain Innovation Club
            </p>
          </div>

          <ScrollReveal>
            <dl className="meta">
              {SNAPSHOT.map((item) => (
                <div key={item.label} className="meta__cell">
                  <dt className="meta__label">{item.label}</dt>
                  <dd className="meta__value">{item.value}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </section>

      <SkillsMarquee />

      <section className="section">
        <div className="shell">
          <SectionHead path="projects" title="Projects" lede="What I've been building lately." />

          <ScrollReveal>
            <PageLink href="/projects" className="feature">
              <span className="feature__top">
                <span className="feature__year">{featured.year}</span>
                <span className="tags">
                  {featured.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </span>
              </span>
              <span className="feature__title">{featured.name}</span>
              <span className="feature__summary">{featured.summary}</span>
              <span className="feature__cta">Read the breakdown</span>
            </PageLink>
          </ScrollReveal>
        </div>
      </section>

      <section className="section section--a3">
        <div className="shell">
          <SectionHead
            path="pages"
            title="Explore"
            lede="Each part of the portfolio has its own page."
          />

          <ul className="index">
            {PAGES.filter((page) => page.href !== "/").map((page, index) => (
              <ScrollReveal as="li" key={page.href} delayMs={index * 50}>
                <PageLink href={page.href} className="index__row" data-accent={page.accent}>
                  <span className="index__path">~/{page.slug}</span>
                  <span className="index__label">{page.label}</span>
                  <span className="index__blurb">{page.blurb}</span>
                </PageLink>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
