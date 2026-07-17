import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [equipmentCount, methodCount, glossaryCount, standardCount, safetyCount] = await Promise.all([
    prisma.equipment.count(),
    prisma.method.count(),
    prisma.glossaryTerm.count(),
    prisma.standardReference.count(),
    prisma.guidePage.count({ where: { section: "SAFETY" } }),
  ]);

  const cards = [
    { label: "Equipment", count: equipmentCount, href: "/admin/equipment" },
    { label: "Methods", count: methodCount, href: "/admin/methods" },
    { label: "Glossary terms", count: glossaryCount, href: "/admin/glossary" },
    { label: "Standards", count: standardCount, href: "/admin/standards" },
    { label: "Safety guides", count: safetyCount, href: "/admin/safety" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Admin</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-white/60">
        Manage the live Phase 1 content. SOPs, Lab Management, Blog, and Directory will get their own admin sections
        once those phases ship.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="app-card-hover rounded-2xl border border-slate-900/[0.07] bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{card.count}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-white/60">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
