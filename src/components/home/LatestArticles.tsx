"use client";

import { motion } from "framer-motion";
import type { Article } from "@prisma/client";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { fadeUpItem, staggerContainer } from "@/components/motion/variants";

export function LatestArticles({ articles }: { articles: Article[] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <SectionHeading title="Latest articles & updates" viewAllHref="/blog" className="mb-6" />
      {articles.length === 0 ? (
        <div className="app-dot-grid relative overflow-hidden rounded-2xl border border-dashed border-slate-900/15 bg-white/40 p-8 text-center dark:border-white/15 dark:bg-white/[0.02]">
          <p className="text-sm text-slate-500 dark:text-white/50">
            The blog launches in Phase 3. Check back for industry trends, new equipment releases, and regulatory updates.
          </p>
        </div>
      ) : (
        <motion.div
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={fadeUpItem} whileHover={{ y: -3 }} className="h-full">
              <Card href={`/blog/${article.slug}`} padded={false}>
                <div className="app-hero-glow h-1.5 w-full" />
                <div className="p-5">
                  <p className="font-semibold text-slate-900 dark:text-white">{article.title}</p>
                  <p className="mt-1.5 line-clamp-2 text-sm text-slate-600 dark:text-white/55">{article.summary}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
