import { getNextPage, type PageHref } from "../lib/pages";
import { PageLink } from "./PageTransition";

export default function NextPage({ current }: { current: PageHref }) {
  const next = getNextPage(current);

  return (
    <nav className="next-page" aria-label="Next page">
      <div className="shell">
        <PageLink href={next.href} className="next-page__link" data-accent={next.accent}>
          <span className="next-page__meta">Next page</span>
          <span className="next-page__title">{next.label}</span>
          <span className="next-page__blurb">{next.blurb}</span>
        </PageLink>
      </div>
    </nav>
  );
}
