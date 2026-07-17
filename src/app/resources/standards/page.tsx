import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { listStandards } from "@/lib/content/standards";

export const metadata: Metadata = { title: "Standards & Regulations Library" };

export default async function StandardsPage() {
  const standards = await listStandards();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Standards & Regulations" },
        ]}
      />
      <h1 className="text-3xl font-semibold tracking-tight">Standards & Regulations Library</h1>
      {standards.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-black/15 p-6 text-sm text-black/50 dark:border-white/20 dark:text-white/50">
          No standards have been added yet.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-black/10 dark:divide-white/10">
          {standards.map((standard) => (
            <li key={standard.id} className="py-4">
              <p className="font-medium">
                {standard.code}
                {standard.title && <span className="font-normal text-black/60 dark:text-white/60"> — {standard.title}</span>}
              </p>
              {standard.summary && <p className="mt-1 text-sm text-black/70 dark:text-white/70">{standard.summary}</p>}
              {standard.url && (
                <a href={standard.url} className="mt-1 inline-block text-sm text-black/60 underline dark:text-white/60">
                  Reference link
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
