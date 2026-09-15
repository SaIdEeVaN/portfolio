import type { Metadata } from "next";
import LanguageRing from "../components/LanguageRing";
import NextPage from "../components/NextPage";
import PageHeader from "../components/PageHeader";
import ScrollReveal from "../components/ScrollReveal";
import { getPage } from "../lib/pages";
import { PROJECTS, type Project } from "../lib/projects";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects by Baviri Setty Sai Deevan: the website of the Blockchain Innovation Club at REC, and VoicePath, voice-first skill discovery and scheme matching under the PM-AJAY skilling ecosystem.",
  path: "/projects",
});

const STEP_ACCENTS = ["a1", "a3", "a4", "a2"] as const;

function ProjectCaseStudy({ project }: { project: Project }) {
  const titleId = `${project.slug}-title`;

  return (
    <article className="project" id={project.slug} aria-labelledby={titleId}>
      <div className="project__intro">
        <h2 id={titleId} className="project__title">
          {project.name}
        </h2>

        <p className="project__summary">{project.summary}</p>

        <div className="project__side">
          <p>{project.description}</p>
          <ul className="tags" aria-label="Built with">
            {project.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
          <div className="project__actions">
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
        </div>
      </div>

      <ScrollReveal>
        <dl className="meta meta--4">
          {project.facts.map((fact) => (
            <div key={fact.label} className="meta__cell">
              <dt className="meta__label">{fact.label}</dt>
              <dd className="meta__value">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </ScrollReveal>

      <section aria-labelledby={`${project.slug}-languages`}>
        <ScrollReveal>
          <h3 id={`${project.slug}-languages`} className="project__subhead">
            Code by language
          </h3>
        </ScrollReveal>
        <LanguageRing languages={project.languages} source={project.languagesSource} />
      </section>

      <section aria-labelledby={`${project.slug}-pipeline`}>
        <ScrollReveal>
          <h3 id={`${project.slug}-pipeline`} className="project__subhead">
            How it works
          </h3>
          <p className="project__note">{project.pipelineNote}</p>
        </ScrollReveal>

        <ol className="pipeline">
          {project.pipeline.map((step, index) => (
            <ScrollReveal as="li" key={step.title} delayMs={index * 70}>
              <div className="pipeline__step" data-accent={STEP_ACCENTS[index % STEP_ACCENTS.length]}>
                <span className="pipeline__num">{String(index + 1).padStart(2, "0")}</span>
                <h4 className="pipeline__title">{step.title}</h4>
                <p className="pipeline__text">{step.text}</p>
                <p className="pipeline__tool">{step.tool}</p>
              </div>
            </ScrollReveal>
          ))}
        </ol>
      </section>

      <section aria-labelledby={`${project.slug}-rules`}>
        <ScrollReveal>
          <h3 id={`${project.slug}-rules`} className="project__subhead">
            Rules the code enforces
          </h3>
        </ScrollReveal>

        <ul className="rules">
          {project.rules.map((rule, index) => (
            <ScrollReveal as="li" key={rule.title} delayMs={index * 80}>
              <div className="rule">
                <h4 className="rule__title">{rule.title}</h4>
                <p className="rule__text">{rule.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        page={getPage("/projects")}
        lede="What I've built, how it works, and where to find the code."
      />

      <section className="page-body">
        <div className="shell">
          {PROJECTS.map((project) => (
            <ProjectCaseStudy key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <NextPage current="/projects" />
    </>
  );
}
