import { SECTIONS } from "../lib/sections";
import { FooterPreferences } from "./PreferenceControls";
import { SectionLink } from "./SectionNav";

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
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <SectionLink to={section.id} className="footer__link">
                    {section.label}
                  </SectionLink>
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
