import { prisma } from "@/lib/prisma";
import { getCategoryTree } from "@/lib/content/categories";

// Phase 2 module. Data layer is ready ahead of the UI so the SOP library,
// once built, needs no schema or query rework.
export function listSopCategories() {
  return getCategoryTree("SOP");
}

export function listSops() {
  return prisma.sop.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true },
    orderBy: { title: "asc" },
  });
}
