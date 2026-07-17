import Link from "next/link";
import type { Article } from "@prisma/client";

export function LatestArticles({ articles }: { articles: Article[] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Latest articles &amp; updates</h2>
        <Link href="/blog" className="text-sm text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white">
          View all →
        </Link>
      </div>
      {articles.length === 0 ? (
        <p className="rounded-lg border border-dashed border-black/15 p-6 text-sm text-black/50 dark:border-white/20 dark:text-white/50">
          The blog launches in Phase 3. Check back for industry trends, new equipment releases, and regulatory updates.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="rounded-lg border border-black/10 p-4 transition hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
            >
              <p className="font-medium">{article.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-black/60 dark:text-white/60">{article.summary}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
