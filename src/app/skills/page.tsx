import type { Metadata } from "next";
import NextPage from "../components/NextPage";
import PageHeader from "../components/PageHeader";
import SkillsLogoGrid from "../components/SkillsLogoGrid";
import { getPage } from "../lib/pages";
import { pageMetadata } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Skills",
  description:
    "Tools and technologies Baviri Setty Sai Deevan works with, from Linux, Nmap, Wireshark and Metasploit to Python, React, Next.js and Django.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        page={getPage("/skills")}
        lede="Tools and technologies I'm comfortable using."
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
