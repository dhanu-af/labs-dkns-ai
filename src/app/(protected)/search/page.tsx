import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ItemCard } from "@/components/catalog/ItemCard";
import { siteSearch } from "@/lib/content/search";

const kindLabels: Record<string, string> = {
  equipment: "Equipment",
  method: "Method",
  glossary: "Glossary",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = q ? await siteSearch(q) : [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <h1 className="text-2xl font-semibold tracking-tight">
        {q ? `Results for "${q}"` : "Search"}
      </h1>
      <div className="mt-6 space-y-3">
        {q && results.length === 0 && (
          <p className="rounded-lg border border-dashed border-black/15 p-6 text-sm text-black/50 dark:border-white/20 dark:text-white/50">
            No matches found.
          </p>
        )}
        {results.map((result) => (
          <ItemCard
            key={`${result.kind}-${result.slug}`}
            href={result.href}
            title={result.title}
            summary={result.summary}
            tag={kindLabels[result.kind]}
          />
        ))}
      </div>
    </div>
  );
}
