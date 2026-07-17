import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { listEquipmentCategories } from "@/lib/content/equipment";
import { EquipmentForm } from "@/components/admin/EquipmentForm";

export const metadata: Metadata = { title: "Admin — Edit Equipment" };
export const dynamic = "force-dynamic";

export default async function EditEquipmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item, categories, standards] = await Promise.all([
    prisma.equipment.findUnique({ where: { id }, include: { standards: true } }),
    listEquipmentCategories(),
    prisma.standardReference.findMany({ orderBy: { code: "asc" } }),
  ]);
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Edit {item.name}</h1>
      <div className="mt-6 max-w-2xl">
        <EquipmentForm initial={item} categories={categories} standards={standards} />
      </div>
    </div>
  );
}
