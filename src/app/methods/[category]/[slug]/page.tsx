import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DetailSection } from "@/components/catalog/DetailSection";
import { getMethodBySlug } from "@/lib/content/methods";

export default async function MethodDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categorySlug, slug } = await params;
  const method = await getMethodBySlug(slug);
  if (!method || method.category.slug !== categorySlug) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Methods", href: "/methods" },
          { label: method.category.name, href: `/methods/${method.category.slug}` },
          { label: method.name },
        ]}
      />
      <h1 className="text-3xl font-semibold tracking-tight">{method.name}</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">{method.summary}</p>

      <div className="mt-8">
        <DetailSection title="Principle">{method.principle}</DetailSection>
        <DetailSection title="Step-by-step procedure">{method.procedure}</DetailSection>

        {method.requiredEquipment && (
          <DetailSection title="Required equipment & reagents">{method.requiredEquipment}</DetailSection>
        )}

        {method.applications && <DetailSection title="Applications & industries">{method.applications}</DetailSection>}

        {method.troubleshooting && (
          <DetailSection title="Common errors & troubleshooting">{method.troubleshooting}</DetailSection>
        )}

        {method.standards.length > 0 && (
          <DetailSection title="Relevant standards">
            <ul className="flex flex-wrap gap-2">
              {method.standards.map((s) => (
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
