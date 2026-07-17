import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { GlossaryForm } from "@/components/admin/GlossaryForm";

export const metadata: Metadata = { title: "Admin — Edit Glossary Term" };
export const dynamic = "force-dynamic";

export default async function EditGlossaryTermPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.glossaryTerm.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Edit {item.term}</h1>
      <div className="mt-6 max-w-xl">
        <GlossaryForm initial={item} />
      </div>
    </div>
  );
}
