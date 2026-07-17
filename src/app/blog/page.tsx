import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { listPublishedArticles } from "@/lib/content/articles";
import { ItemCard } from "@/components/catalog/ItemCard";

export const metadata: Metadata = { title: "News & Insights" };

export default async function BlogPage() {
  const articles = await listPublishedArticles(20);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      {articles.length === 0 ? (
        <ComingSoon
          title="News & Insights"
          phase={3}
          description="Industry trends, new equipment releases, regulatory updates, and case studies."
          items={["Industry trends", "New equipment releases", "Regulatory updates", "Case studies"]}
        />
      ) : (
        <div className="pb-10">
          <h1 className="text-3xl font-semibold tracking-tight">News & Insights</h1>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ItemCard key={article.id} href={`/blog/${article.slug}`} title={article.title} summary={article.summary} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
