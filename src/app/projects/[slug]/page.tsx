import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NextProject from "../../components/NextProject";
import PageHeader from "../../components/PageHeader";
import { PageLink } from "../../components/PageTransition";
import ProjectCaseStudy from "../../components/ProjectCaseStudy";
import { getPage } from "../../lib/pages";
import { getProject, PROJECTS, projectHref } from "../../lib/projects";
import { pageMetadata } from "../../lib/site";

type ProjectPageProps = { params: Promise<{ slug: string }> };

// Every project page is built ahead of time; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};

  return pageMetadata({
    title: project.name,
    description: project.summary,
    path: projectHref(project),
    imagePath: projectHref(project),
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <>
      <PageHeader
        page={getPage("/projects")}
        title={project.name}
        path={
          <>
            <PageLink href="/projects" className="page-header__crumb">
              ~/projects
            </PageLink>
            /{project.slug}
          </>
        }
        lede={project.summary}
      >
        <div className="page-header__action project__actions">
          <a
            className="btn btn--a1"
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic=""
          >
            View code on GitHub
          </a>
          {project.liveUrl ? (
            <a
              className="btn"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic=""
            >
              Open live demo
            </a>
          ) : null}
        </div>
      </PageHeader>

      <section className="page-body">
        <div className="shell">
          <ProjectCaseStudy project={project} />
        </div>
      </section>

      <NextProject current={project} />
    </>
  );
}
