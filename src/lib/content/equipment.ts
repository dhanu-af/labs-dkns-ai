import { prisma } from "@/lib/prisma";
import { getCategoryAndDescendantIds, getCategoryTree } from "@/lib/content/categories";

export function listEquipmentCategories() {
  return getCategoryTree("EQUIPMENT");
}

export async function listEquipmentByCategorySlug(slug: string) {
  const result = await getCategoryAndDescendantIds("EQUIPMENT", slug);
  if (!result) return null;
  const equipment = await prisma.equipment.findMany({
    where: { categoryId: { in: result.ids }, status: "PUBLISHED" },
    include: { category: true },
    orderBy: { name: "asc" },
  });
  return { category: result.category, equipment };
}

export function getEquipmentBySlug(slug: string) {
  return prisma.equipment.findUnique({
    where: { slug },
    include: { category: { include: { parent: true } }, standards: true },
  });
}

export function listFeaturedEquipment(take = 6) {
  return prisma.equipment.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true },
    orderBy: { updatedAt: "desc" },
    take,
  });
}

export function searchEquipment(query: string, take = 10) {
  return prisma.equipment.findMany({
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
