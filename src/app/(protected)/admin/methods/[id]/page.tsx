import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { listMethodCategories } from "@/lib/content/methods";
import { MethodForm } from "@/components/admin/MethodForm";

export const metadata: Metadata = { title: "Admin — Edit Method" };
export const dynamic = "force-dynamic";

export default async function EditMethodPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item, categories, standards] = await Promise.all([
    prisma.method.findUnique({ where: { id }, include: { standards: true } }),
    listMethodCategories(),
    prisma.standardReference.findMany({ orderBy: { code: "asc" } }),
  ]);
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Edit {item.name}</h1>
      <div className="mt-6 max-w-2xl">
        <MethodForm initial={item} categories={categories} standards={standards} />
      </div>
    </div>
  );
}
