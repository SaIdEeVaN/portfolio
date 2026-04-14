"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50">
      <div className="glass-surface glass-highlight border-b border-foreground/10">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm text-foreground/80 hover:text-foreground"
        >
          <span className="text-foreground sm:hidden">deevan</span>
          <span className="hidden text-foreground sm:inline">
            Baviri Setty Sai Deevan
          </span>
          <span className="text-foreground/60">@portfolio</span>
          <span className="text-foreground/60">:~$</span>
        </Link>

        <div className="flex items-center gap-1 text-sm">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "rounded-md px-3 py-2 transition-colors " +
                  (isActive
                    ? "bg-foreground/10 text-foreground"
                    : "text-foreground/70 hover:bg-foreground/10 hover:text-foreground")
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