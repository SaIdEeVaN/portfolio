import type { Project } from "../lib/projects";
import LanguageRing from "./LanguageRing";
import ScrollReveal from "./ScrollReveal";

const STEP_ACCENTS = ["a1", "a3", "a4", "a2"] as const;

// The body of a project page. The name, summary and links sit in the page header above it.
export default function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <div className="project">
      <div className="project__intro">
        <p className="project__description">{project.description}</p>
        <div className="project__built">
          <h2 className="eyebrow">Built with</h2>
          <ul className="tags">
            {project.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
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

      <section aria-labelledby="languages">
        <ScrollReveal>
          <h2 id="languages" className="project__subhead">
            Code by language
          </h2>
        </ScrollReveal>
        <LanguageRing languages={project.languages} source={project.languagesSource} />
      </section>

      <section aria-labelledby="pipeline">
        <ScrollReveal>
          <h2 id="pipeline" className="project__subhead">
            How it works
          </h2>
          <p className="project__note">{project.pipelineNote}</p>
        </ScrollReveal>

        <ol className="pipeline">
          {project.pipeline.map((step, index) => (
            <ScrollReveal as="li" key={step.title} delayMs={index * 70}>
              <div className="pipeline__step" data-accent={STEP_ACCENTS[index % STEP_ACCENTS.length]}>
                <span className="pipeline__num">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="pipeline__title">{step.title}</h3>
                <p className="pipeline__text">{step.text}</p>
                <p className="pipeline__tool">{step.tool}</p>
              </div>
            </ScrollReveal>
          ))}
        </ol>
      </section>

      <section aria-labelledby="rules">
        <ScrollReveal>
          <h2 id="rules" className="project__subhead">
            Rules the code enforces
          </h2>
        </ScrollReveal>

        <ul className="rules">
          {project.rules.map((rule, index) => (
            <ScrollReveal as="li" key={rule.title} delayMs={index * 80}>
              <div className="rule">
                <h3 className="rule__title">{rule.title}</h3>
                <p className="rule__text">{rule.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
