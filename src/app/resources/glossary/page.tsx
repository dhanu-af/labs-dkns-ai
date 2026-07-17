import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { listGlossaryTerms } from "@/lib/content/glossary";

export const metadata: Metadata = { title: "Glossary of Terms" };

export default async function GlossaryPage() {
  const terms = await listGlossaryTerms();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Glossary" },
        ]}
      />
      <h1 className="text-3xl font-semibold tracking-tight">Glossary of Terms</h1>
      {terms.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-black/15 p-6 text-sm text-black/50 dark:border-white/20 dark:text-white/50">
          No glossary terms have been added yet.
        </p>
      ) : (
        <dl className="mt-8 divide-y divide-black/10 dark:divide-white/10">
          {terms.map((term) => (
            <div key={term.id} id={term.slug} className="py-4">
              <dt className="font-medium">{term.term}</dt>
              <dd className="mt-1 text-sm text-black/70 dark:text-white/70">{term.definition}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
