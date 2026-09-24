import { ImageResponse } from "next/og";
import { getProject, PROJECTS } from "../../lib/projects";
import { SOCIAL_CARD_SIZE, ProjectSocialCard } from "../../lib/socialCard";

export const size = SOCIAL_CARD_SIZE;

export const contentType = "image/png";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function TwitterImage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    <ProjectSocialCard name={project.name} year={project.year} tags={project.tags} />,
    size,
  );
}
