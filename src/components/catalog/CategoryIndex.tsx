import Link from "next/link";
import type { CategoryNode } from "@/lib/content/categories";
import { Pill } from "@/components/ui/Pill";

export function CategoryIndex({ basePath, categories }: { basePath: string; categories: CategoryNode[] }) {
  if (categories.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-900/15 p-6 text-sm text-slate-500 dark:border-white/20 dark:text-white/50">
        No categories have been added yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {categories.map((group) => (
        <section
          key={group.id}
          className="rounded-2xl border border-slate-900/[0.07] bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"
        >
          <Link
            href={`${basePath}/${group.slug}`}
            className="text-lg font-semibold tracking-tight text-slate-900 hover:text-indigo-600 dark:text-white dark:hover:text-violet-400"
          >
            {group.name}
          </Link>
          {group.description && <p className="mt-1 text-sm text-slate-600 dark:text-white/60">{group.description}</p>}
          {group.children.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {group.children.map((sub) => (
                <Pill key={sub.id} href={`${basePath}/${sub.slug}`}>
                  {sub.name}
                </Pill>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
