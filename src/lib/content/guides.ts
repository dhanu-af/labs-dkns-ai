import { prisma } from "@/lib/prisma";
import type { GuideSection } from "@prisma/client";

export function listGuidePages(section: GuideSection) {
  return prisma.guidePage.findMany({
    where: { section, status: "PUBLISHED" },
    orderBy: { order: "asc" },
  });
}

export function getGuidePage(section: GuideSection, slug: string) {
  return prisma.guidePage.findUnique({
    where: { section_slug: { section, slug } },
  });
}
