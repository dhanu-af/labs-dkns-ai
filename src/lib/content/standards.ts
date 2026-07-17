import { prisma } from "@/lib/prisma";

export function listStandards() {
  return prisma.standardReference.findMany({ orderBy: { code: "asc" } });
}
