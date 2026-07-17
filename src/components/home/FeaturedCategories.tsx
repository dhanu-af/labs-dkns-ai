import Link from "next/link";
import type { CategoryNode } from "@/lib/content/categories";

export function FeaturedCategories({
  title,
  basePath,
  categories,
}: {
  title: string;
  basePath: string;
  categories: CategoryNode[];
}) {
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <Link href={basePath} className="text-sm text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white">
          View all →
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`${basePath}/${category.slug}`}
            className="rounded-lg border border-black/10 p-4 transition hover:border-black/30 hover:bg-black/[0.02] dark:border-white/10 dark:hover:border-white/30 dark:hover:bg-white/[0.03]"
          >
            <p className="font-medium">{category.name}</p>
            {category.children.length > 0 && (
              <p className="mt-1 text-sm text-black/50 dark:text-white/50">
                {category.children.length} subcategories
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
