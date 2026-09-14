export const SECTIONS = [
  { id: "home", label: "Home", accent: "a1" },
  { id: "about", label: "About", accent: "a3" },
  { id: "experience", label: "Experience", accent: "a4" },
  { id: "education", label: "Education", accent: "a1" },
  { id: "skills", label: "Skills", accent: "ink" },
  { id: "contact", label: "Contact", accent: "a2" },
] as const;

export type Section = (typeof SECTIONS)[number];
export type SectionId = Section["id"];

export function getSection(id: SectionId): Section {
  return SECTIONS.find((section) => section.id === id) ?? SECTIONS[0];
}
