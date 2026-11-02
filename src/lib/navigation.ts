export function getSectionHref(sectionId: string) {
  const normalizedId = sectionId.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')
  return `#${normalizedId}`
}
