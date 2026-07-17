import { prisma } from "@/lib/prisma";

export function listGlossaryTerms() {
  return prisma.glossaryTerm.findMany({ orderBy: { term: "asc" } });
}

export function searchGlossaryTerms(query: string, take = 10) {
  return prisma.glossaryTerm.findMany({
    where: {
      OR: [
        { term: { contains: query, mode: "insensitive" } },
        { definition: { contains: query, mode: "insensitive" } },
      ],
    },
    take,
  });
}
