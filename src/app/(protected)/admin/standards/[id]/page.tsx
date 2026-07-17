import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StandardForm } from "@/components/admin/StandardForm";

export const metadata: Metadata = { title: "Admin — Edit Standard" };
export const dynamic = "force-dynamic";

export default async function EditStandardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.standardReference.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Edit {item.code}</h1>
      <div className="mt-6 max-w-xl">
        <StandardForm initial={item} />
      </div>
    </div>
  );
}
