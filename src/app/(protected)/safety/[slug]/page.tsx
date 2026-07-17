import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EditLink } from "@/components/admin/EditLink";
import { getGuidePage } from "@/lib/content/guides";

export const dynamic = "force-dynamic";

export default async function SafetyTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = await getGuidePage("SAFETY", slug);
  if (!topic) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Safety & Compliance", href: "/safety" },
          { label: topic.title },
        ]}
      />
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">{topic.title}</h1>
        <EditLink href={`/admin/safety/${topic.id}`} />
      </div>
      {topic.summary && <p className="mt-2 text-black/60 dark:text-white/60">{topic.summary}</p>}
      <div className="prose-sm mt-8 whitespace-pre-line text-black/80 dark:text-white/80">{topic.body}</div>
    </div>
  );
}
