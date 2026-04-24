import ScrollReveal from "./components/ScrollReveal";
import SkillsLogoGrid from "./components/SkillsLogoGrid";
import Image from "next/image";

type TimelineItem = {
  title: string;
  subtitle: string;
  start: string;
  end: string;
  summary?: string;
  highlights?: string[];
};

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative space-y-4">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={`${item.title}-${item.subtitle}-${item.start}`} className="relative pl-10">
            {!isLast ? (
              <span
                aria-hidden="true"
                className="absolute left-[11px] top-7 h-[calc(100%+16px)] w-[2px] bg-foreground/20"
              />
            ) : null}

            <span
              aria-hidden="true"
              className="absolute left-2 top-7 h-3 w-3 rounded-full border border-foreground/35 bg-background ring-4 ring-background"
            />

            <section className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium text-foreground/90">{item.title}</h3>
                  <p className="mt-1 text-sm text-foreground/75">{item.subtitle}</p>
                </div>

                <p className="font-mono text-xs text-foreground/60 sm:text-right">
                  {item.start} — {item.end}
                </p>
              </div>

              {item.summary ? (
                <p className="mt-3 text-sm text-foreground/80">{item.summary}</p>
              ) : null}

              {item.highlights?.length ? (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/80">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          </li>
        );
      })}
    </ol>
  );
}

export default function Home() {
  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/SaIdEeVaN",
      iconSrc: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg",
      iconClassName: "dark:invert",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/bavirisetty-sai-deevan",
      iconSrc: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg",
      iconClassName: "dark:invert",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/_._saideevan_._/",
      iconSrc: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/instagram.svg",
      iconClassName: "dark:invert",
    },
  ] as const;

  const experienceItems: TimelineItem[] = [
    {
      title: "Tech Team Member",
      subtitle: "Blockchain Innovation Club, Rajalakshmi Engineering College",
      start: "Nov 2025",
      end: "Present",
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

  const educationItems: TimelineItem[] = [
    {
      title: "Rajalakshmi Engineering College",
      subtitle: "B.E Computer Science and Engineering (Cyber Security) · CGPA: 8.71",
      start: "Aug 2024",
      end: "May 2028",
    },
    {
      title: "Vivekananda Vidyalaya Jr. College",
      subtitle: "Schooling · Percentage: 92.2%",
      start: "Jun 2010",
      end: "Mar 2024",
    },
  ];

  return (
    <div className="space-y-16">
      <section id="home" className="scroll-mt-28 space-y-10">
        <ScrollReveal>
          <div className="space-y-5">
            <p className="font-mono text-sm text-foreground/60">
              Hi, I am Baviri Setty Sai Deevan.
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Aspiring software engineer and lifelong learner.
            </h1>
            <p className="max-w-2xl text-base text-foreground/75 sm:text-lg">
              I&apos;m passionate about DevOps and cybersecurity. Most days you&apos;ll
              find me in the Linux CLI (especially Debian) — building, breaking,
              and improving systems until they&apos;re reliable and secure.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={80}>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
              <p className="font-mono text-xs text-foreground/60">Focus</p>
              <p className="mt-2 text-sm text-foreground/80">
                Systems, DevOps, cybersecurity, and Linux.
              </p>
            </div>
            <div className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
              <p className="font-mono text-xs text-foreground/60">Stack</p>
              <p className="mt-2 text-sm text-foreground/80">
                React / Next.js, Django, Python, C/C++, SQL, Tailwind CSS.
              </p>
            </div>
            <div className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
              <p className="font-mono text-xs text-foreground/60">Currently</p>
              <p className="mt-2 text-sm text-foreground/80">
                Learning, building projects, and improving this portfolio.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section id="about" className="scroll-mt-28 space-y-8">
        <ScrollReveal>
          <header className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight">About</h2>
            <p className="max-w-2xl text-foreground/75">
              I&apos;m passionate about DevOps and cybersecurity. I spend most of my
              time in the Linux CLI (especially Debian) — building, breaking,
              and improving.
            </p>
          </header>
        </ScrollReveal>

        <ScrollReveal delayMs={80}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
              <p className="font-mono text-xs text-foreground/60">How I work</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                <li>Linux-first workflow: terminal, tooling, and automation.</li>
                <li>Security mindset: threat-aware, least privilege, hardening.</li>
                <li>Iterative approach: build → break → fix → improve.</li>
              </ul>
            </div>

            <div className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
              <p className="font-mono text-xs text-foreground/60">What I build</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                <li>Automation scripts and developer tooling</li>
                <li>CI/CD workflows and deployment setups</li>
                <li>Security-focused projects and experiments</li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section id="experience" className="scroll-mt-28 space-y-8">
        <ScrollReveal>
          <header className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight">Experience</h2>
            <p className="max-w-2xl text-foreground/75">
              A short timeline of roles and responsibilities.
            </p>
          </header>
        </ScrollReveal>

        <ScrollReveal delayMs={80}>
          <Timeline items={experienceItems} />
        </ScrollReveal>
      </section>

      <section id="education" className="scroll-mt-28 space-y-8">
        <ScrollReveal>
          <header className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight">Education</h2>
            <p className="max-w-2xl text-foreground/75">
              Academic background and qualifications.
            </p>
          </header>
        </ScrollReveal>

        <ScrollReveal delayMs={80}>
          <Timeline items={educationItems} />
        </ScrollReveal>
      </section>

      <section id="skills" className="scroll-mt-28 space-y-8">
        <ScrollReveal>
          <header className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight">Skills</h2>
            <p className="max-w-2xl text-foreground/75">
              Tools and technologies I&apos;m comfortable using.
            </p>
          </header>
        </ScrollReveal>

        <ScrollReveal delayMs={80}>
          <SkillsLogoGrid />
        </ScrollReveal>
      </section>

      <section id="contact" className="scroll-mt-28 space-y-8">
        <ScrollReveal>
          <header className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
            <p className="max-w-2xl text-foreground/75">
              Want to collaborate or chat? Reach out.
            </p>
          </header>
        </ScrollReveal>

        <ScrollReveal delayMs={80}>
          <section className="glass-surface glass-highlight glass-inner-border rounded-2xl p-5">
            <dl className="space-y-4">
              <div>
                <dt className="font-mono text-xs text-foreground/60">Email</dt>
                <dd className="mt-2 flex flex-wrap items-center gap-2">
                  <a
                    className="glass-surface glass-inner-border group inline-flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
                    href="mailto:saideevan@gmail.com"
                    aria-label="Email"
                    title="Email"
                  >
                    <Image
                      src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/gmail.svg"
                      alt="Email"
                      width={20}
                      height={20}
                      className="opacity-80 transition-opacity group-hover:opacity-100 dark:invert"
                    />
                  </a>
                </dd>
              </div>

              <div>
                <dt className="font-mono text-xs text-foreground/60">Phone</dt>
                <dd className="mt-2 flex flex-wrap items-center gap-2">
                  <a
                    className="glass-surface glass-inner-border inline-flex h-10 items-center rounded-xl bg-foreground/5 px-4 text-sm text-foreground/75 transition-colors hover:bg-foreground/10 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
                    href="tel:+918838291379"
                    aria-label="Phone"
                    title="Call"
                  >
                    +91 88382 91379
                  </a>
                </dd>
              </div>

              <div>
                <dt className="font-mono text-xs text-foreground/60">Social</dt>
                <dd className="mt-2 flex flex-wrap items-center gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      className="glass-surface glass-inner-border group inline-flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <Image
                        src={social.iconSrc}
                        alt={social.label}
                        width={20}
                        height={20}
                        className={`opacity-80 transition-opacity group-hover:opacity-100 ${social.iconClassName ?? ""}`}
                      />
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </section>
        </ScrollReveal>
      </section>
    </div>
  );
}