import { prisma } from "@/lib/prisma";
import type { CategoryType } from "@prisma/client";

export interface CategoryNode {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  order: number;
  children: CategoryNode[];
}

// Returns the two-level category tree (group -> subcategory) for a module,
// e.g. Equipment's "Analytical Instruments" group with its Spectroscopy,
// Chromatography, etc. subcategories nested underneath.
export async function getCategoryTree(type: CategoryType): Promise<CategoryNode[]> {
  const categories = await prisma.category.findMany({
    where: { type },
    orderBy: { order: "asc" },
  });

  const bySlug = new Map(categories.map((c) => [c.id, { ...c, children: [] as CategoryNode[] }]));
  const roots: CategoryNode[] = [];

  for (const category of bySlug.values()) {
    if (category.parentId && bySlug.has(category.parentId)) {
      bySlug.get(category.parentId)!.children.push(category);
    } else {
      roots.push(category);
    }
  }

  return roots;
}

export async function getCategoryBySlug(type: CategoryType, slug: string) {
  return prisma.category.findUnique({
    where: { type_slug: { type, slug } },
    include: { children: true, parent: true },
  });
}

// A category page needs the ids of the category itself plus any children,
// since content can be tagged at either the group or subcategory level.
export async function getCategoryAndDescendantIds(type: CategoryType, slug: string) {
  const category = await getCategoryBySlug(type, slug);
  if (!category) return null;
  return {
    category,
    ids: [category.id, ...category.children.map((c) => c.id)],
  };
}
