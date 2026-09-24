import Image from "next/image";
import type { Metadata } from "next";
import NextPage from "../components/NextPage";
import Scramble from "../components/Scramble";
import ScrollReveal from "../components/ScrollReveal";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Baviri Setty Sai Deevan by email, WhatsApp, GitHub, LinkedIn, or Instagram.",
  path: "/contact",
});

type ContactItem = {
  label: string;
  value: string;
  href: string;
  iconSrc: string;
  external: boolean;
  wide?: boolean;
};

// Icons are served from public/contact, from Simple Icons (CC0): 16.32.0, except LinkedIn, which
// left the set after 13.21.0.
const CONTACTS: ContactItem[] = [
  {
    label: "Email",
    value: "saideevan@gmail.com",
    href: "mailto:saideevan@gmail.com",
    iconSrc: "/contact/gmail.svg",
    external: false,
    wide: true,
  },
  {
    label: "WhatsApp",
    value: "+91 88382 91379",
    href: "https://wa.me/918838291379",
    iconSrc: "/contact/whatsapp.svg",
    external: true,
  },
  {
    label: "GitHub",
    value: "SaIdEeVaN",
    href: "https://github.com/SaIdEeVaN",
    iconSrc: "/contact/github.svg",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "bavirisetty-sai-deevan",
    href: "https://linkedin.com/in/bavirisetty-sai-deevan",
    iconSrc: "/contact/linkedin.svg",
    external: true,
  },
  {
    label: "Instagram",
    value: "_._saideevan_._",
    href: "https://www.instagram.com/_._saideevan_._/",
    iconSrc: "/contact/instagram.svg",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <header className="page-header" data-accent="a2">
        <div className="shell page-header__inner">
          <p className="eyebrow eyebrow--path">~/contact</p>
          <h1 className="contact__title" aria-label="Let's talk">
            <Scramble className="contact__line" text="Let's" />
            <Scramble className="contact__line" text="talk" />
          </h1>
          <p className="page-header__lede">Want to collaborate or chat? Reach out.</p>
        </div>
      </header>

      <section className="page-body">
        <div className="shell">
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

      <NextPage current="/contact" />
    </>
  );
}
