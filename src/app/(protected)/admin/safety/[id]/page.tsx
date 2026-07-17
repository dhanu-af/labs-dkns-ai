import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { GuidePageForm } from "@/components/admin/GuidePageForm";

export const metadata: Metadata = { title: "Admin — Edit Safety Guide" };
export const dynamic = "force-dynamic";

export default async function EditSafetyGuidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.guidePage.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Edit {item.title}</h1>
      <div className="mt-6 max-w-2xl">
        <GuidePageForm initial={item} />
      </div>
    </div>
  );
}
