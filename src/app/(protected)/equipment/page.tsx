import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CategoryIndex } from "@/components/catalog/CategoryIndex";
import { listEquipmentCategories } from "@/lib/content/equipment";

export const metadata: Metadata = { title: "Equipment & Instruments" };
export const dynamic = "force-dynamic";

export default async function EquipmentIndexPage() {
  const categories = await listEquipmentCategories();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Equipment" }]} />
      <h1 className="text-3xl font-semibold tracking-tight">Equipment & Instruments</h1>
      <p className="mt-2 max-w-2xl text-black/60 dark:text-white/60">
        Analytical instruments and general lab equipment, organized by category.
      </p>
      <div className="mt-8">
        <CategoryIndex basePath="/equipment" categories={categories} />
      </div>
    </div>
  );
}
