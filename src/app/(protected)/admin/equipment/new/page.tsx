import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { listEquipmentCategories } from "@/lib/content/equipment";
import { EquipmentForm } from "@/components/admin/EquipmentForm";

export const metadata: Metadata = { title: "Admin — New Equipment" };
export const dynamic = "force-dynamic";

export default async function NewEquipmentPage() {
  const [categories, standards] = await Promise.all([
    listEquipmentCategories(),
    prisma.standardReference.findMany({ orderBy: { code: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">New equipment</h1>
      <div className="mt-6 max-w-2xl">
        <EquipmentForm categories={categories} standards={standards} />
      </div>
    </div>
  );
}
