import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteGuidePage } from "@/lib/actions/admin-actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata: Metadata = { title: "Admin — Safety Guides" };
export const dynamic = "force-dynamic";

export default async function AdminSafetyPage() {
  const items = await prisma.guidePage.findMany({
    where: { section: "SAFETY" },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Safety guides</h1>
        <Link href="/admin/safety/new" className="app-hero-glow rounded-full px-4 py-2 text-sm font-semibold text-white">
          + New page
        </Link>
      </div>

      <div className="mt-6 divide-y divide-slate-900/[0.07] rounded-2xl border border-slate-900/[0.07] bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.03]">
        {items.length === 0 ? (
          <p className="p-5 text-sm text-slate-500 dark:text-white/50">No safety guide pages yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
                <p className="text-xs text-slate-500 dark:text-white/50">
                  Order {item.order} · {item.status}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/safety/${item.id}`}
                  className="rounded-lg border border-slate-900/10 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/5"
                >
                  Edit
                </Link>
                <DeleteButton action={deleteGuidePage.bind(null, item.id)} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
