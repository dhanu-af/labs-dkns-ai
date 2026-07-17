import { prisma } from "@/lib/prisma";

// Phase 3 module (News & Insights). Ready ahead of the UI.
export function listPublishedArticles(take = 6) {
  return prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({ where: { slug } });
}
