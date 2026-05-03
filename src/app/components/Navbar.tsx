import Link from "next/link";

const LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#education", label: "Education" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
] as const;

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50" aria-label="Primary">
      <div className="relative overflow-hidden bg-background glass-highlight border-b border-foreground/10">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:flex-nowrap sm:px-6 sm:py-4">
          <Link
            href="/#home"
            className="min-w-0 rounded-md font-mono text-sm text-foreground/80 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
          >
            <span className="text-foreground sm:hidden">deevan</span>
            <span className="hidden text-foreground sm:inline">
              Baviri Setty Sai Deevan
            </span>
            <span className="text-foreground/60">@portfolio</span>
            <span className="text-foreground/60">:~$</span>
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-1 text-xs sm:text-sm">
            {LINKS.map((link) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    "rounded-md px-2 py-1.5 text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 sm:px-3 sm:py-2"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}