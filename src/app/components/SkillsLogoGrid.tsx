import Image from "next/image";
import { getProject, PROJECTS, projectHref, type Project } from "../lib/projects";
import { PageLink } from "./PageTransition";
import ScrollReveal from "./ScrollReveal";

type SkillLogo = {
  name: string;
  src: string;
  // Slugs of the projects that use it, checked against each project's repo.
  projects?: string[];
};

type SkillGroup = {
  title: string;
  skills: SkillLogo[];
};

// Icons are served from public/skills. Sources: devicon 2.17.0 (MIT) for the language, framework
// and tool logos; Simple Icons 16.32.0 (CC0) for Wireshark, Metasploit, Bash, Render, PyPI and
// MapLibre; and Nmap's eye logo from the Windows icon in the nmap/nmap repository.
const GROUPS: SkillGroup[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python", src: "/skills/python.svg", projects: ["secretsentinel", "voicepath"] },
      {
        name: "JavaScript",
        src: "/skills/javascript.svg",
        projects: ["secretsentinel", "chess-engine", "bic-rec"],
      },
      { name: "TypeScript", src: "/skills/typescript.svg", projects: ["voicepath"] },
      { name: "HTML", src: "/skills/html.svg", projects: ["secretsentinel", "chess-engine", "bic-rec"] },
      {
        name: "CSS",
        src: "/skills/css.svg",
        projects: ["secretsentinel", "chess-engine", "bic-rec", "voicepath"],
      },
      { name: "Shell Scripting", src: "/skills/bash.svg", projects: ["secretsentinel"] },
      { name: "PowerShell", src: "/skills/powershell.svg", projects: ["secretsentinel"] },
      { name: "Solidity", src: "/skills/solidity.svg", projects: ["secretsentinel"] },
      { name: "Java", src: "/skills/java.svg" },
      { name: "C", src: "/skills/c.png" },
      { name: "C++", src: "/skills/cplusplus.svg" },
      { name: "R", src: "/skills/r.svg" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      {
        name: "React",
        src: "/skills/react.svg",
        projects: ["secretsentinel", "chess-engine", "bic-rec", "voicepath"],
      },
      { name: "Next.js", src: "/skills/nextjs.svg", projects: ["voicepath"] },
      { name: "Vite", src: "/skills/vite.svg", projects: ["secretsentinel", "chess-engine", "bic-rec"] },
      {
        name: "Tailwind CSS",
        src: "/skills/tailwindcss.svg",
        projects: ["secretsentinel", "bic-rec", "voicepath"],
      },
      { name: "React Router", src: "/skills/reactrouter.svg", projects: ["secretsentinel", "bic-rec"] },
      { name: "MapLibre", src: "/skills/maplibre.svg", projects: ["voicepath"] },
    ],
  },
  {
    title: "Backend and data",
    skills: [
      { name: "FastAPI", src: "/skills/fastapi.svg", projects: ["secretsentinel", "voicepath"] },
      { name: "PostgreSQL", src: "/skills/postgresql.svg", projects: ["secretsentinel", "voicepath"] },
      { name: "Supabase", src: "/skills/supabase.svg", projects: ["voicepath"] },
      { name: "SQLite", src: "/skills/sqlite.svg", projects: ["secretsentinel"] },
      { name: "Django", src: "/skills/django.svg" },
      { name: "MySQL", src: "/skills/mysql.svg" },
      { name: "MongoDB", src: "/skills/mongodb.svg" },
    ],
  },
  {
    title: "Testing, CI and hosting",
    skills: [
      {
        name: "GitHub Actions",
        src: "/skills/githubactions.svg",
        projects: ["secretsentinel", "chess-engine", "bic-rec", "voicepath"],
      },
      { name: "Playwright", src: "/skills/playwright.svg", projects: ["secretsentinel", "bic-rec"] },
      { name: "pytest", src: "/skills/pytest.svg", projects: ["secretsentinel", "voicepath"] },
      { name: "Docker", src: "/skills/docker.svg", projects: ["voicepath"] },
      { name: "Firebase", src: "/skills/firebase.svg", projects: ["chess-engine", "bic-rec"] },
      { name: "Vercel", src: "/skills/vercel.svg", projects: ["voicepath"] },
      { name: "Render", src: "/skills/render.svg", projects: ["secretsentinel", "voicepath"] },
      { name: "PyPI", src: "/skills/pypi.svg", projects: ["secretsentinel"] },
    ],
  },
  {
    title: "Security and systems",
    skills: [
      { name: "Linux", src: "/skills/linux.svg" },
      { name: "Nmap", src: "/skills/nmap.png" },
      { name: "Wireshark", src: "/skills/wireshark.svg" },
      { name: "Metasploit", src: "/skills/metasploit.svg" },
    ],
  },
];

const SKILLS = GROUPS.flatMap((group) => group.skills);

// The projects a skill is used in, newest first. A slug that names no project fails the build.
function skillProjects(skill: SkillLogo): Project[] {
  return (skill.projects ?? [])
    .map((slug) => {
      const project = getProject(slug);
      if (!project) throw new Error(`Skill "${skill.name}" names an unknown project "${slug}"`);
      return project;
    })
    .sort((a, b) => PROJECTS.indexOf(a) - PROJECTS.indexOf(b));
}

const TILE_ACCENTS = ["a1", "a2", "a3", "a4"] as const;

export function SkillsMarquee() {
  const renderSet = (key: string) => (
    <div key={key} className="marquee__set">
      {SKILLS.map((skill) => (
        <span key={skill.name} className="marquee__item">
          {skill.name}
          <span className="marquee__sep" />
        </span>
      ))}
    </div>
  );

  // Decorative: the same skills are listed with names on the Skills page.
  // The wrapper clips the tilted band so it can never widen the page.
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee">
        <div className="marquee__track">{[renderSet("a"), renderSet("b")]}</div>
      </div>
    </div>
  );
}

export default function SkillsLogoGrid() {
  let tileIndex = 0;

  return (
    <div className="skill-groups">
      {GROUPS.map((group, groupIndex) => {
        const headingId = `skills-${groupIndex}`;

        return (
          <section key={group.title} className="skill-group" aria-labelledby={headingId}>
            <ScrollReveal>
              <h2 id={headingId} className="skill-group__title">
                {group.title}
              </h2>
            </ScrollReveal>

            <ul className="stack">
              {group.skills.map((skill, index) => {
                const isSvg = skill.src.toLowerCase().endsWith(".svg");
                const projects = skillProjects(skill);
                const accent = TILE_ACCENTS[tileIndex++ % TILE_ACCENTS.length];

                return (
                  <ScrollReveal as="li" key={skill.name} delayMs={Math.min(index, 12) * 35}>
                    <div className="tile" data-accent={accent} data-magnetic="">
                      <span className="tile__logo">
                        <Image
                          src={skill.src}
                          width={30}
                          height={30}
                          alt=""
                          unoptimized={isSvg}
                          style={isSvg ? undefined : { width: 30, height: 30 }}
                        />
                      </span>
                      <span className="tile__name">{skill.name}</span>
                      {projects.length > 0 ? (
                        <span className="tile__projects">
                          <span className="tile__projects-label">Used in</span>
                          {projects.map((project) => (
                            <PageLink
                              key={project.slug}
                              href={projectHref(project)}
                              wipeLabel={project.name}
                              className="tile__project"
                            >
                              {project.name}
                            </PageLink>
                          ))}
                        </span>
                      ) : null}
                    </div>
                  </ScrollReveal>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
