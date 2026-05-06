import Image from "next/image";
//hi
type SkillLogo = {
  name: string;
  src?: string;
  fallbackText?: string;
  className?: string;
};

const SKILLS: SkillLogo[] = [
  { name: "Linux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Nmap", src: "https://nmap.org/images/nmap-logo-256x256.png" },
  { name: "Wireshark", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/wireshark.svg", className: "dark:invert opacity-70" },
  { name: "Metasploit", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/metasploit.svg", className: "dark:invert opacity-70" },
  { name: "Shell Scripting", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/gnubash.svg", className: "dark:invert opacity-70" },
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

export default function SkillsLogoGrid() {
  const Card = ({ skill }: { skill: SkillLogo }) => {
    const isSvg = Boolean(skill.src?.toLowerCase().endsWith(".svg"));
    const isLocalRaster = Boolean(skill.src?.startsWith("/") && !isSvg);

    return (
      <div className="glass-surface glass-highlight glass-inner-border w-40 shrink-0 rounded-xl p-4">
        <div className="grid place-items-center">
          <div className="grid h-12 w-12 place-items-center rounded-lg border border-foreground/10 bg-foreground/5">
            {skill.src ? (
              <Image
                src={skill.src}
                width={26}
                height={26}
                alt={skill.name}
                className={skill.className}
                unoptimized={isSvg}
                style={isLocalRaster ? { width: 26, height: 26 } : undefined}
              />
            ) : (
              <span className="font-mono text-[10px] text-foreground/70">
                {skill.fallbackText ?? "SKILL"}
              </span>
            )}
          </div>
          <p className="mt-3 min-h-[2.25rem] text-center text-xs leading-tight text-foreground/85">
            {skill.name}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="skills-marquee">
      <div className="skills-marquee__track py-1">
        <div className="skills-marquee__set">
          {SKILLS.map((skill) => (
            <Card key={skill.name} skill={skill} />
          ))}
        </div>
        <div className="skills-marquee__set skills-marquee__set--dup" aria-hidden="true">
          {SKILLS.map((skill) => (
            <Card key={`${skill.name}-dup`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
