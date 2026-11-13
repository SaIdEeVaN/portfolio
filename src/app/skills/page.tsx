import type { Metadata } from "next";
import NextPage from "../components/NextPage";
import PageHeader from "../components/PageHeader";
import SkillsLogoGrid from "../components/SkillsLogoGrid";
import { getPage } from "../lib/pages";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Skills",
  description:
    "Tools and technologies Baviri Setty Sai Deevan works with, grouped into languages, frontend, backend and data, testing, CI and hosting, and security, each with the projects it is used in.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        page={getPage("/skills")}
        lede="What I build with, and the projects I used it in."
      />

      <section className="page-body page-body--ink on-ink">
        <div className="shell">
          <SkillsLogoGrid />
        </div>
      </section>

      <NextPage current="/skills" />
    </>
  );
}
