import { prisma } from "@/lib/prisma";
import { getCategoryAndDescendantIds, getCategoryTree } from "@/lib/content/categories";

export function listMethodCategories() {
  return getCategoryTree("METHOD");
}

export async function listMethodsByCategorySlug(slug: string) {
  const result = await getCategoryAndDescendantIds("METHOD", slug);
  if (!result) return null;
  const methods = await prisma.method.findMany({
    where: { categoryId: { in: result.ids }, status: "PUBLISHED" },
    include: { category: true },
    orderBy: { name: "asc" },
  });
  return { category: result.category, methods };
}

export function getMethodBySlug(slug: string) {
  return prisma.method.findUnique({
    where: { slug },
    include: { category: { include: { parent: true } }, standards: true },
  });
}

export function listFeaturedMethods(take = 6) {
  return prisma.method.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true },
    orderBy: { updatedAt: "desc" },
    take,
  });
}

export function searchMethods(query: string, take = 10) {
  return prisma.method.findMany({
    where: {
      status: "PUBLISHED",
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { summary: { contains: query, mode: "insensitive" } },
      ],
    },
    include: { category: true },
    take,
  });
}
