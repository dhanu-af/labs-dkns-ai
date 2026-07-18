import { prisma } from "@/lib/prisma";

export interface SiteStats {
  equipment: number;
  methods: number;
  standards: number;
  glossaryTerms: number;
}

// Real content counts for the homepage stats bar -- no analytics/usage data
// exists for this site, so "interactive statistics" means real, live counts
// of what's actually in the reference hub, not a fabricated dashboard.
export async function getSiteStats(): Promise<SiteStats> {
  const [equipment, methods, standards, glossaryTerms] = await Promise.all([
    prisma.equipment.count({ where: { status: "PUBLISHED" } }),
    prisma.method.count({ where: { status: "PUBLISHED" } }),
    prisma.standardReference.count(),
    prisma.glossaryTerm.count(),
  ]);

  return { equipment, methods, standards, glossaryTerms };
}
