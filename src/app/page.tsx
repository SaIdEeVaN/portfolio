import Image from "next/image";
import Scramble from "./components/Scramble";
import ScrollReveal from "./components/ScrollReveal";
import { SectionLink } from "./components/SectionNav";
import SkillsLogoGrid, { SkillsMarquee } from "./components/SkillsLogoGrid";

type TimelineItem = {
  title: string;
  subtitle: string;
  start: string;
  end: string;
  summary?: string;
  highlights?: string[];
};

type EducationItem = {
  title: string;
  detail: string;
  score: string;
  start: string;
  end: string;
};

type ContactItem = {
  label: string;
  value: string;
  href: string;
  iconSrc: string;
  external: boolean;
  wide?: boolean;
};

const HERO_INTRO =
  "I'm passionate about DevOps and cybersecurity. Most days you'll find me in the Linux CLI (especially Debian) — building, breaking, and improving systems until they're reliable and secure.";

const SNAPSHOT = [
  { label: "Focus", value: "Systems, DevOps, cybersecurity, and Linux." },
  { label: "Stack", value: "React / Next.js, Django, Python, C/C++, SQL, Tailwind CSS." },
  { label: "Currently", value: "Learning, building projects, and improving this portfolio." },
] as const;

const EXPERIENCE_ITEMS: TimelineItem[] = [
  {
    title: "Technology Executive",
    subtitle: "Blockchain Innovation Club, Rajalakshmi Engineering College",
    start: "Jul 2026",
    end: "Present",
  },
  {
    title: "Tech Team Member",
    subtitle: "Blockchain Innovation Club, Rajalakshmi Engineering College",
    start: "Nov 2025",
    end: "Jun 2026",
    summary: "Contributing to club technical initiatives and collaborative builds.",
    highlights: ['Led "Byte The Dust: A Cyber Forensics Event" during Titanium 2026.'],
  },
  {
    title: "Web Development Intern",
    subtitle: "InternPe",
    start: "Dec 2025",
    end: "Jan 2026",
    summary: "Built and iterated on web features as part of an internship.",
  },
  {
    title: "Vice President",
    subtitle: "Science Club, Vivekananda Vidyalaya Jr. College",
    start: "Jun 2022",
    end: "Apr 2023",
    summary: "Supported club leadership, coordination, and student-led activities.",
  },
];

const EDUCATION_ITEMS: EducationItem[] = [
  {
    title: "Rajalakshmi Engineering College",
    detail: "B.E Computer Science and Engineering (Cyber Security)",
    score: "CGPA: 8.71",
    start: "Aug 2024",
    end: "May 2028",
  },
  {
    title: "Vivekananda Vidyalaya Jr. College",
    detail: "Schooling",
    score: "Percentage: 92.2%",
    start: "Jun 2010",
    end: "Mar 2024",
  },
];

const CONTACTS: ContactItem[] = [
  {
    label: "Email",
    value: "saideevan@gmail.com",
    href: "mailto:saideevan@gmail.com",
    iconSrc: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/gmail.svg",
    external: false,
    wide: true,
  },
  {
    label: "WhatsApp",
    value: "+91 88382 91379",
    href: "https://wa.me/918838291379",
    iconSrc: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/whatsapp.svg",
    external: true,
  },
  {
    label: "GitHub",
    value: "SaIdEeVaN",
    href: "https://github.com/SaIdEeVaN",
    iconSrc: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "bavirisetty-sai-deevan",
    href: "https://linkedin.com/in/bavirisetty-sai-deevan",
    iconSrc: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg",
    external: true,
  },
  {
    label: "Instagram",
    value: "_._saideevan_._",
    href: "https://www.instagram.com/_._saideevan_._/",
    iconSrc: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/instagram.svg",
    external: true,
  },
];

function SectionHead({ path, title, lede }: { path: string; title: string; lede: string }) {
  return (
    <ScrollReveal className="section-head">
      <p className="eyebrow eyebrow--path">~/{path}</p>
      <h2 className="section-head__title">{title}</h2>
      <p className="section-head__lede">{lede}</p>
    </ScrollReveal>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="rows">
      {items.map((item, index) => {
        const isCurrent = item.end === "Present";
        return (
          <ScrollReveal
            as="li"
            key={`${item.title}-${item.subtitle}-${item.start}`}
            delayMs={index * 70}
          >
            <article className="row">
              <p className="row__date">
                {item.start} — {item.end}
              </p>

              <div>
                <h3 className="row__title">{item.title}</h3>
                <p className="row__org">{item.subtitle}</p>

                {item.summary ? <p className="row__summary">{item.summary}</p> : null}

                {item.highlights?.length ? (
                  <ul className="row__highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : null}
              </div>

              {isCurrent ? (
                <p className="row__now">
                  <span className="status-dot" aria-hidden="true" />
                  Current role
                </p>
              ) : null}
            </article>
          </ScrollReveal>
        );
      })}
    </ol>
  );
}

export default function Home() {
  return (
    <>
      <section id="home" tabIndex={-1} className="hero">
        <div className="shell hero__inner">
          <div className="hero__deco" aria-hidden="true">
            <span className="deco deco--one" data-parallax="0.3" />
            <span className="deco deco--two" data-parallax="0.25">
              &gt;_
            </span>
            <span className="deco deco--three" data-parallax="0.28" />
          </div>

          <p className="eyebrow hero__eyebrow">Hi, I am Baviri Setty Sai Deevan.</p>

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
            <SectionLink to="contact" className="btn btn--a1" magnetic>
              Get in touch
            </SectionLink>
            <SectionLink to="experience" className="btn" magnetic>
              See experience
            </SectionLink>
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

      <section id="about" tabIndex={-1} className="section section--a3">
        <div className="shell">
          <SectionHead
            path="about"
            title="About"
            lede="I'm passionate about DevOps and cybersecurity. I spend most of my time in the Linux CLI (especially Debian) — building, breaking, and improving."
          />

          <div className="about__grid">
            <ScrollReveal className="card">
              <h3 className="card__title">How I work</h3>
              <ul className="card__list">
                <li>Linux-first workflow: terminal, tooling, and automation.</li>
                <li>Security mindset: threat-aware, least privilege, hardening.</li>
                <li>Iterative approach: build → break → fix → improve.</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal className="card" delayMs={90}>
              <h3 className="card__title">What I build</h3>
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

      <section id="experience" tabIndex={-1} className="section">
        <div className="shell">
          <SectionHead
            path="experience"
            title="Experience"
            lede="A short timeline of roles and responsibilities."
          />
          <Timeline items={EXPERIENCE_ITEMS} />
        </div>
      </section>

      <section id="education" tabIndex={-1} className="section section--a1">
        <div className="shell">
          <SectionHead
            path="education"
            title="Education"
            lede="Academic background and qualifications."
          />

          <ol className="edu__grid">
            {EDUCATION_ITEMS.map((item, index) => (
              <ScrollReveal as="li" key={item.title} delayMs={index * 90}>
                <article className="card edu-card">
                  <p className="edu-card__dates">
                    {item.start} — {item.end}
                  </p>
                  <h3 className="edu-card__title">{item.title}</h3>
                  <p className="edu-card__detail">{item.detail}</p>
                  <p className="edu-card__score">{item.score}</p>
                </article>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="skills" tabIndex={-1} className="section section--ink on-ink">
        <div className="shell">
          <SectionHead
            path="skills"
            title="Skills"
            lede="Tools and technologies I'm comfortable using."
          />
          <SkillsLogoGrid />
        </div>
      </section>

      <section id="contact" tabIndex={-1} className="section">
        <div className="shell">
          <div className="contact__head">
            <p className="eyebrow eyebrow--path">~/contact</p>
            <h2 className="contact__title" aria-label="Let's talk">
              <Scramble className="contact__line" text="Let's" trigger="view" />
              <Scramble className="contact__line" text="talk" trigger="view" />
            </h2>
            <p className="section-head__lede">Want to collaborate or chat? Reach out.</p>
          </div>

          <ul className="contact__grid">
            {CONTACTS.map((contact, index) => (
              <ScrollReveal
                as="li"
                key={contact.label}
                delayMs={index * 60}
                className={contact.wide ? "contact__wide" : undefined}
              >
                <a
                  className="contact-card"
                  href={contact.href}
                  data-magnetic=""
                  {...(contact.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className="contact-card__icon">
                    <Image src={contact.iconSrc} alt="" width={26} height={26} unoptimized />
                  </span>
                  <span>
                    <span className="contact-card__label">{contact.label}</span>
                    <span className="contact-card__value">{contact.value}</span>
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
