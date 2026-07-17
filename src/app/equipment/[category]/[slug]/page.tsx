import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DetailSection } from "@/components/catalog/DetailSection";
import { SpecTable } from "@/components/catalog/SpecTable";
import { ManufacturerList } from "@/components/catalog/ManufacturerList";
import { getEquipmentBySlug } from "@/lib/content/equipment";

export default async function EquipmentDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categorySlug, slug } = await params;
  const equipment = await getEquipmentBySlug(slug);
  if (!equipment || equipment.category.slug !== categorySlug) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Equipment", href: "/equipment" },
          { label: equipment.category.name, href: `/equipment/${equipment.category.slug}` },
          { label: equipment.name },
        ]}
      />
      <h1 className="text-3xl font-semibold tracking-tight">{equipment.name}</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">{equipment.summary}</p>

      <div className="mt-8">
        <DetailSection title="Overview & working principle">{equipment.overview}</DetailSection>

        {equipment.specifications != null && (
          <DetailSection title="Technical specifications">
            <SpecTable specifications={equipment.specifications} />
          </DetailSection>
        )}

        {equipment.applications && <DetailSection title="Applications">{equipment.applications}</DetailSection>}

        {equipment.manufacturers != null && (
          <DetailSection title="Leading manufacturers & models">
            <ManufacturerList manufacturers={equipment.manufacturers} />
          </DetailSection>
        )}

        {equipment.maintenanceNotes && (
          <DetailSection title="Maintenance & calibration">{equipment.maintenanceNotes}</DetailSection>
        )}

        {equipment.safetyNotes && <DetailSection title="Safety notes">{equipment.safetyNotes}</DetailSection>}

        {equipment.buyingGuide && (
          <DetailSection title="Buying guide & comparison">{equipment.buyingGuide}</DetailSection>
        )}

        {equipment.standards.length > 0 && (
          <DetailSection title="Relevant standards">
            <ul className="flex flex-wrap gap-2">
              {equipment.standards.map((s) => (
                <li key={s.id} className="rounded-full border border-black/15 px-3 py-1 text-sm dark:border-white/20">
                  {s.code}
                </li>
              ))}
            </ul>
          </DetailSection>
        )}
      </div>
    </div>
  );
}
