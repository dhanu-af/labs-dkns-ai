import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getArticleBySlug } from "@/lib/content/articles";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || article.status !== "PUBLISHED") notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: article.title }]} />
      <h1 className="text-3xl font-semibold tracking-tight">{article.title}</h1>
      <p className="mt-2 text-black/60 dark:text-white/60">{article.summary}</p>
      <div className="prose-sm mt-8 whitespace-pre-line text-black/80 dark:text-white/80">{article.body}</div>
    </div>
  );
}
