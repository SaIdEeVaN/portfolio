import type { Metadata } from "next";
import NextPage from "../components/NextPage";
import PageHeader from "../components/PageHeader";
import Timeline, { type TimelineItem } from "../components/Timeline";
import { getPage } from "../lib/pages";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Experience",
  description:
    "Roles held by Baviri Setty Sai Deevan, including Technology Executive at the Blockchain Innovation Club, Rajalakshmi Engineering College.",
  path: "/experience",
});

const EXPERIENCE_ITEMS: TimelineItem[] = [
  {
    title: "Technology Executive",
    subtitle: "Blockchain Innovation Club, Rajalakshmi Engineering College",
    start: "Jul 2026",
    end: "Present",
    link: { href: "/projects/bic-rec", label: "See the club website I built" },
  },
  {
    title: "Tech Team Member",
    subtitle: "Blockchain Innovation Club, Rajalakshmi Engineering College",
    start: "Nov 2025",
    end: "Jun 2026",
    summary: "Contributing to club technical initiatives and collaborative builds.",
    highlights: ['Led "Byte The Dust: A Cyber Forensics Event" during Titanium 2026.'],
  },
  {
    title: "Web Development Intern",
    subtitle: "InternPe",
    start: "Dec 2025",
    end: "Jan 2026",
    summary: "Built and iterated on web features as part of an internship.",
  },
  {
    title: "Vice President",
    subtitle: "Science Club, Vivekananda Vidyalaya Jr. College",
    start: "Jun 2022",
    end: "Apr 2023",
    summary: "Supported club leadership, coordination, and student-led activities.",
  },
];

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        page={getPage("/experience")}
        lede="A short timeline of roles and responsibilities."
      />

      <section className="page-body">
        <div className="shell">
          <Timeline items={EXPERIENCE_ITEMS} />
        </div>
      </section>

      <NextPage current="/experience" />
    </>
  );
}
