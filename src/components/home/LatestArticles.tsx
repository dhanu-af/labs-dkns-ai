"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { Article } from "@prisma/client";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export function LatestArticles({ articles }: { articles: Article[] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Latest articles &amp; updates</h2>
        <Link
          href="/blog"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          View all →
        </Link>
      </div>
      {articles.length === 0 ? (
        <div className="app-dot-grid relative overflow-hidden rounded-2xl border border-dashed border-slate-900/15 bg-white/40 p-8 text-center dark:border-white/15 dark:bg-white/[0.02]">
          <p className="text-sm text-slate-500 dark:text-white/50">
            The blog launches in Phase 3. Check back for industry trends, new equipment releases, and regulatory updates.
          </p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={item} whileHover={{ y: -3 }}>
              <Link
                href={`/blog/${article.slug}`}
                className="app-card-hover block h-full overflow-hidden rounded-2xl border border-slate-900/[0.07] bg-white dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="app-hero-glow h-1.5 w-full" />
                <div className="p-5">
                  <p className="font-semibold text-slate-900 dark:text-white">{article.title}</p>
                  <p className="mt-1.5 line-clamp-2 text-sm text-slate-600 dark:text-white/55">{article.summary}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
