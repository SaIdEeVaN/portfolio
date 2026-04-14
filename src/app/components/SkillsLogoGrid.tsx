import Image from "next/image";

type SkillLogo = {
  name: string;
  src: string;
};

const SKILLS: SkillLogo[] = [
  { name: "Linux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Debian", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/debian/debian-original.svg" },
  { name: "C", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
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
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {SKILLS.map((skill) => (
        <div
          key={skill.name}
          className="glass-surface glass-inner-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="spin-holder grid h-10 w-10 place-items-center rounded-lg border border-foreground/10 bg-foreground/5">
              <Image
                src={skill.src}
                width={22}
                height={22}
                alt={skill.name}
              />
            </div>
            <p className="text-sm text-foreground/85">{skill.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
