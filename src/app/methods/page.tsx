import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CategoryIndex } from "@/components/catalog/CategoryIndex";
import { listMethodCategories } from "@/lib/content/methods";

export const metadata: Metadata = { title: "Methods & Techniques" };

export default async function MethodsIndexPage() {
  const categories = await listMethodCategories();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Methods" }]} />
      <h1 className="text-3xl font-semibold tracking-tight">Methods & Techniques</h1>
      <p className="mt-2 max-w-2xl text-black/60 dark:text-white/60">
        Chemical, instrumental, biological, and physical testing methods, organized by discipline.
      </p>
      <div className="mt-8">
        <CategoryIndex basePath="/methods" categories={categories} />
      </div>
    </div>
  );
}
