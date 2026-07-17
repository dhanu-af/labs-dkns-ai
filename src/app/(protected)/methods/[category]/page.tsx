import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ItemCard } from "@/components/catalog/ItemCard";
import { listMethodsByCategorySlug } from "@/lib/content/methods";

export const dynamic = "force-dynamic";

export default async function MethodCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const result = await listMethodsByCategorySlug(categorySlug);
  if (!result) notFound();
  const { category, methods } = result;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Methods", href: "/methods" },
          { label: category.name },
        ]}
      />
      <h1 className="text-3xl font-semibold tracking-tight">{category.name}</h1>
      {category.description && <p className="mt-2 max-w-2xl text-black/60 dark:text-white/60">{category.description}</p>}

      {category.children.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {category.children.map((sub) => (
            <a
              key={sub.id}
              href={`/methods/${sub.slug}`}
              className="rounded-full border border-black/15 px-3 py-1 text-sm transition hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              {sub.name}
            </a>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {methods.length === 0 ? (
          <p className="rounded-lg border border-dashed border-black/15 p-6 text-sm text-black/50 dark:border-white/20 dark:text-white/50">
            No methods have been added to this category yet.
          </p>
        ) : (
          methods.map((item) => (
            <ItemCard
              key={item.id}
              href={`/methods/${item.category.slug}/${item.slug}`}
              title={item.name}
              summary={item.summary}
            />
          ))
        )}
      </div>
    </div>
  );
}
