import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getGuidePage } from "@/lib/content/guides";

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
      <h1 className="text-3xl font-semibold tracking-tight">{topic.title}</h1>
      {topic.summary && <p className="mt-2 text-black/60 dark:text-white/60">{topic.summary}</p>}
      <div className="prose-sm mt-8 whitespace-pre-line text-black/80 dark:text-white/80">{topic.body}</div>
    </div>
  );
}
