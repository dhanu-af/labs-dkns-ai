import Link from "next/link";
import type { CategoryNode } from "@/lib/content/categories";

export function CategoryIndex({ basePath, categories }: { basePath: string; categories: CategoryNode[] }) {
  if (categories.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-black/15 p-6 text-sm text-black/50 dark:border-white/20 dark:text-white/50">
        No categories have been added yet.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {categories.map((group) => (
        <section key={group.id}>
          <Link href={`${basePath}/${group.slug}`} className="text-lg font-semibold tracking-tight hover:underline">
            {group.name}
          </Link>
          {group.description && <p className="mt-1 text-sm text-black/60 dark:text-white/60">{group.description}</p>}
          {group.children.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {group.children.map((sub) => (
                <Link
                  key={sub.id}
                  href={`${basePath}/${sub.slug}`}
                  className="rounded-full border border-black/15 px-3 py-1 text-sm transition hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
