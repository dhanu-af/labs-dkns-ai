import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteEquipment } from "@/lib/actions/admin-actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "Admin — Equipment" };
export const dynamic = "force-dynamic";

export default async function AdminEquipmentPage() {
  const items = await prisma.equipment.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Equipment</h1>
        <Link
          href="/admin/equipment/new"
          className="app-hero-glow rounded-full px-4 py-2 text-sm font-semibold text-white"
        >
          + New equipment
        </Link>
      </div>

      <div className="mt-6 divide-y divide-slate-900/[0.07] rounded-2xl border border-slate-900/[0.07] bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]">
        {items.length === 0 ? (
          <p className="p-5 text-sm text-slate-500 dark:text-white/50">No equipment yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{item.name}</p>
                <p className="text-xs text-slate-500 dark:text-white/50">
                  {item.category.name} · {item.status}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/equipment/${item.id}`}
                  className="rounded-lg border border-slate-900/10 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/5"
                >
                  Edit
                </Link>
                <DeleteButton action={deleteEquipment.bind(null, item.id)} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
