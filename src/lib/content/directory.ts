import { prisma } from "@/lib/prisma";

// Phase 2/3 module. Ready ahead of the UI.
export function listDirectoryListings() {
  return prisma.directoryListing.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true },
    orderBy: { name: "asc" },
  });
}
