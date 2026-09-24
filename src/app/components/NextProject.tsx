import { getNextProject, projectAccent, projectHref, type Project } from "../lib/projects";
import { PageLink } from "./PageTransition";

export default function NextProject({ current }: { current: Project }) {
  const next = getNextProject(current);

  return (
    <nav className="next-page" aria-label="Next project">
      <div className="shell">
        <PageLink
          href={projectHref(next)}
          wipeLabel={next.name}
          className="next-page__link"
          data-accent={projectAccent(next)}
        >
          <span className="next-page__meta">Next project</span>
          <span className="next-page__title">{next.name}</span>
          <span className="next-page__blurb">{next.summary}</span>
        </PageLink>
      </div>
    </nav>
  );
}
