import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { listMethodCategories } from "@/lib/content/methods";
import { MethodForm } from "@/components/admin/MethodForm";

export const metadata: Metadata = { title: "Admin — New Method" };
export const dynamic = "force-dynamic";

export default async function NewMethodPage() {
  const [categories, standards] = await Promise.all([
    listMethodCategories(),
    prisma.standardReference.findMany({ orderBy: { code: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">New method</h1>
      <div className="mt-6 max-w-2xl">
        <MethodForm categories={categories} standards={standards} />
      </div>
    </div>
  );
}
