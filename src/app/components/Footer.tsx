import { PAGES } from "../lib/pages";
import { PageLink } from "./PageTransition";
import { FooterPreferences } from "./PreferenceControls";

export default function Footer() {
  return (
    <footer className="footer on-ink">
      <div className="shell">
        <p className="footer__name">
          <span>Baviri Setty</span>
          <span>Sai Deevan</span>
        </p>
        <p className="footer__school">
          B.E Computer Science and Engineering (Cyber Security), Rajalakshmi Engineering
          College, Chennai
        </p>

        <div className="footer__grid">
          <nav aria-label="Footer">
            <ul className="footer__nav">
              {PAGES.map((page) => (
                <li key={page.href}>
                  <PageLink href={page.href} className="footer__link">
                    {page.label}
                  </PageLink>
                </li>
              ))}
            </ul>
          </nav>

          <FooterPreferences />
        </div>

        <p className="footer__legal">© {new Date().getFullYear()} Baviri Setty Sai Deevan</p>
      </div>
    </footer>
  );
}
