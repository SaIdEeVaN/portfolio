import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

type SkillLogo = {
  name: string;
  src: string;
};

// Icons are served from public/skills. Sources: devicon 2.17.0 (MIT) for the language and
// framework logos, Simple Icons 16.32.0 (CC0) for Wireshark, Metasploit and Bash, and Nmap's eye
// logo from the Windows icon in the nmap/nmap repository.
const SKILLS: SkillLogo[] = [
  { name: "Linux", src: "/skills/linux.svg" },
  { name: "Nmap", src: "/skills/nmap.png" },
  { name: "Wireshark", src: "/skills/wireshark.svg" },
  { name: "Metasploit", src: "/skills/metasploit.svg" },
  { name: "Shell Scripting", src: "/skills/bash.svg" },
  { name: "Java", src: "/skills/java.svg" },
  { name: "HTML", src: "/skills/html.svg" },
  { name: "CSS", src: "/skills/css.svg" },
  { name: "JavaScript", src: "/skills/javascript.svg" },
  { name: "C", src: "/skills/c.png" },
  { name: "C++", src: "/skills/cplusplus.svg" },
  { name: "R", src: "/skills/r.svg" },
  { name: "Python", src: "/skills/python.svg" },
  { name: "TypeScript", src: "/skills/typescript.svg" },
  { name: "React", src: "/skills/react.svg" },
  { name: "Next.js", src: "/skills/nextjs.svg" },
  { name: "Tailwind CSS", src: "/skills/tailwindcss.svg" },
  { name: "Django", src: "/skills/django.svg" },
  { name: "MySQL", src: "/skills/mysql.svg" },
  { name: "MongoDB", src: "/skills/mongodb.svg" },
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
                  style={isSvg ? undefined : { width: 30, height: 30 }}
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
