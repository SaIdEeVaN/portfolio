"use client";
import Link from "next/link";

export default function Navbar() {
  const links = [
    { href: "/#home", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#experience", label: "Experience" },
    { href: "/#education", label: "Education" },
    { href: "/#skills", label: "Skills" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50">
      <div className="glass-surface glass-highlight border-b border-foreground/10">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:flex-nowrap sm:px-6 sm:py-4">
          <Link
            href="/#home"
            className="min-w-0 font-mono text-sm text-foreground/80 hover:text-foreground"
          >
            <span className="text-foreground sm:hidden">deevan</span>
            <span className="hidden text-foreground sm:inline">
              Baviri Setty Sai Deevan
            </span>
            <span className="text-foreground/60">@portfolio</span>
            <span className="text-foreground/60">:~$</span>
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-1 text-xs sm:text-sm">
            {links.map((link) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    "rounded-md px-2 py-1.5 text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground sm:px-3 sm:py-2"
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