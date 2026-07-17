import { searchEquipment } from "@/lib/content/equipment";
import { searchMethods } from "@/lib/content/methods";
import { searchGlossaryTerms } from "@/lib/content/glossary";

export interface SearchResult {
  kind: "equipment" | "method" | "glossary";
  slug: string;
  title: string;
  summary: string;
  href: string;
}

// Powers the hero search bar (1) and hero copy "search equipment, methods,
// SOPs". SOPs will join this fan-out once the Phase 2 module ships content.
export async function siteSearch(query: string): Promise<SearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const [equipment, methods, glossaryTerms] = await Promise.all([
    searchEquipment(trimmed),
    searchMethods(trimmed),
    searchGlossaryTerms(trimmed),
  ]);

  return [
    ...equipment.map((e) => ({
      kind: "equipment" as const,
      slug: e.slug,
      title: e.name,
      summary: e.summary,
      href: `/equipment/${e.category.slug}/${e.slug}`,
    })),
    ...methods.map((m) => ({
      kind: "method" as const,
      slug: m.slug,
      title: m.name,
      summary: m.summary,
      href: `/methods/${m.category.slug}/${m.slug}`,
    })),
    ...glossaryTerms.map((g) => ({
      kind: "glossary" as const,
      slug: g.slug,
      title: g.term,
      summary: g.definition,
      href: `/resources/glossary#${g.slug}`,
    })),
  ];
}
