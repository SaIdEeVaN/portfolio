import type { Metadata } from "next";
import NextPage from "../components/NextPage";
import PageHeader from "../components/PageHeader";
import { PageLink } from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";
import { getPage } from "../lib/pages";
import { PROJECTS, projectAccent, projectHref } from "../lib/projects";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects by Baviri Setty Sai Deevan: a chess engine written from scratch with a teaching mode for its search, the website of the Blockchain Innovation Club at REC, and VoicePath, voice-first skill discovery and scheme matching under the PM-AJAY skilling ecosystem.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        page={getPage("/projects")}
        lede="What I've built, how it works, and where to find the code. Each project has its own page."
      />

      <section className="page-body">
        <div className="shell">
          <ul className="project-list">
            {PROJECTS.map((project, index) => (
              // The id keeps old /projects#slug links landing on the right card.
              <li key={project.slug} id={project.slug}>
                <ScrollReveal delayMs={index * 70}>
                  <PageLink
                    href={projectHref(project)}
                    wipeLabel={project.name}
                    className="feature"
                    data-accent={projectAccent(project)}
                  >
                    <span className="feature__top">
                      <span className="feature__year">{project.year}</span>
                      <span className="tags">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span className="feature__title">{project.name}</span>
                    <span className="feature__summary">{project.summary}</span>
                    <span className="feature__cta">Read the case study</span>
                  </PageLink>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <NextPage current="/projects" />
    </>
  );
}
