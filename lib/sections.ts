export const SECTION_IDS = [
  "about",
  "projects",
  "experience",
  "notes",
  "philosophy",
  "random",
] as const

export type SectionId = (typeof SECTION_IDS)[number]

export const DEFAULT_SECTION_ID: SectionId = "about"

export function isSectionId(id: string): id is SectionId {
  return (SECTION_IDS as readonly string[]).includes(id)
}

export function resolveSectionId(id: string | null | undefined): SectionId {
  if (id && isSectionId(id)) return id
  return DEFAULT_SECTION_ID
}
