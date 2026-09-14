import type { Metadata } from "next";
import NextPage from "../components/NextPage";
import PageHeader from "../components/PageHeader";
import ScrollReveal from "../components/ScrollReveal";
import { getPage } from "../lib/pages";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Education",
  description:
    "Academic background of Baviri Setty Sai Deevan: B.E Computer Science and Engineering (Cyber Security) at Rajalakshmi Engineering College.",
  path: "/education",
});

type EducationItem = {
  title: string;
  detail: string;
  score: string;
  start: string;
  end: string;
};

const EDUCATION_ITEMS: EducationItem[] = [
  {
    title: "Rajalakshmi Engineering College",
    detail: "B.E Computer Science and Engineering (Cyber Security)",
    score: "CGPA: 8.71",
    start: "Aug 2024",
    end: "May 2028",
  },
  {
    title: "Vivekananda Vidyalaya Jr. College",
    detail: "Schooling",
    score: "Percentage: 92.2%",
    start: "Jun 2010",
    end: "Mar 2024",
  },
];

export default function EducationPage() {
  return (
    <>
      <PageHeader page={getPage("/education")} lede="Academic background and qualifications." />

      <section className="page-body">
        <div className="shell">
          <ol className="edu__grid">
            {EDUCATION_ITEMS.map((item, index) => (
              <ScrollReveal as="li" key={item.title} delayMs={index * 90}>
                <article className="card edu-card">
                  <p className="edu-card__dates">
                    {item.start} — {item.end}
                  </p>
                  <h2 className="edu-card__title">{item.title}</h2>
                  <p className="edu-card__detail">{item.detail}</p>
                  <p className="edu-card__score">{item.score}</p>
                </article>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <NextPage current="/education" />
    </>
  );
}
