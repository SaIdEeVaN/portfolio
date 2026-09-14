import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

type SkillLogo = {
  name: string;
  src: string;
};

const SKILLS: SkillLogo[] = [
  { name: "Linux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Nmap", src: "https://nmap.org/images/nmap-logo-256x256.png" },
  { name: "Wireshark", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/wireshark.svg" },
  { name: "Metasploit", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/metasploit.svg" },
  { name: "Shell Scripting", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/gnubash.svg" },
  { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "HTML", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "C", src: "/skills/c.png" },
  { name: "C++", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "R", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Django", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
];

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
  return (
    <ul className="stack">
      {SKILLS.map((skill, index) => {
        const isSvg = skill.src.toLowerCase().endsWith(".svg");
        const isLocalRaster = skill.src.startsWith("/") && !isSvg;

        return (
          <ScrollReveal as="li" key={skill.name} delayMs={Math.min(index, 12) * 35}>
            <div className="tile" data-accent={TILE_ACCENTS[index % TILE_ACCENTS.length]} data-magnetic="">
              <span className="tile__logo">
                <Image
                  src={skill.src}
                  width={30}
                  height={30}
                  alt=""
                  unoptimized={isSvg}
                  style={isLocalRaster ? { width: 30, height: 30 } : undefined}
                />
              </span>
              <span className="tile__name">{skill.name}</span>
            </div>
          </ScrollReveal>
        );
      })}
    </ul>
  );
}
