import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ItemCard } from "@/components/catalog/ItemCard";
import { listEquipmentByCategorySlug } from "@/lib/content/equipment";

export default async function EquipmentCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const result = await listEquipmentByCategorySlug(categorySlug);
  if (!result) notFound();
  const { category, equipment } = result;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Equipment", href: "/equipment" },
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
              href={`/equipment/${sub.slug}`}
              className="rounded-full border border-black/15 px-3 py-1 text-sm transition hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              {sub.name}
            </a>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {equipment.length === 0 ? (
          <p className="rounded-lg border border-dashed border-black/15 p-6 text-sm text-black/50 dark:border-white/20 dark:text-white/50">
            No equipment has been added to this category yet.
          </p>
        ) : (
          equipment.map((item) => (
            <ItemCard
              key={item.id}
              href={`/equipment/${item.category.slug}/${item.slug}`}
              title={item.name}
              summary={item.summary}
            />
          ))
        )}
      </div>
    </div>
  );
}
