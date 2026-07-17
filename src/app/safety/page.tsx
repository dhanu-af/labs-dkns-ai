import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PhaseBadge } from "@/components/ui/PhaseBadge";
import { listGuidePages } from "@/lib/content/guides";

export const metadata: Metadata = { title: "Safety & Compliance" };

const phase2Sections = [
  { title: "Regulatory Standards by Region", description: "US (OSHA, EPA, FDA), EU (REACH, CLP), Asia-Pacific, Middle East, and more." },
  { title: "Waste Management", description: "Hazardous waste disposal and biological waste protocols." },
  { title: "Safety Data Sheets (SDS) Reference", description: "Lookup and reference for SDS documents." },
];

export default async function SafetyIndexPage() {
  const topics = await listGuidePages("SAFETY");

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Safety & Compliance" }]} />
      <h1 className="text-3xl font-semibold tracking-tight">Safety & Compliance</h1>
      <p className="mt-2 max-w-2xl text-black/60 dark:text-white/60">
        General lab safety guidance, with regional regulatory detail and waste management arriving in Phase 2.
      </p>

      <h2 className="mt-8 text-lg font-semibold tracking-tight">General Lab Safety</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.length === 0 ? (
          <p className="rounded-lg border border-dashed border-black/15 p-6 text-sm text-black/50 dark:border-white/20 dark:text-white/50">
            No safety topics have been added yet.
          </p>
        ) : (
          topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/safety/${topic.slug}`}
              className="rounded-lg border border-black/10 p-4 transition hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
            >
              <p className="font-medium">{topic.title}</p>
              {topic.summary && <p className="mt-1 text-sm text-black/60 dark:text-white/60">{topic.summary}</p>}
            </Link>
          ))
        )}
      </div>

      <h2 className="mt-10 text-lg font-semibold tracking-tight">Coming in Phase 2</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {phase2Sections.map((section) => (
          <div key={section.title} className="rounded-lg border border-black/10 p-4 dark:border-white/10">
            <div className="mb-2">
              <PhaseBadge phase={2} />
            </div>
            <p className="font-medium">{section.title}</p>
            <p className="mt-1 text-sm text-black/60 dark:text-white/60">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
