"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { CategoryNode } from "@/lib/content/categories";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export function FeaturedCategories({
  title,
  basePath,
  categories,
}: {
  title: string;
  basePath: string;
  categories: CategoryNode[];
}) {
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
        <Link
          href={basePath}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          View all →
        </Link>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={item}
            className="app-card-hover rounded-2xl border border-slate-900/[0.07] bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <Link
              href={`${basePath}/${category.slug}`}
              className="font-semibold text-slate-900 hover:text-indigo-600 dark:text-white dark:hover:text-violet-400"
            >
              {category.name}
            </Link>
            {category.children.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {category.children.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`${basePath}/${sub.slug}`}
                    className="app-pill rounded-full border border-slate-900/[0.08] bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 hover:border-indigo-300/60 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/65 dark:hover:border-violet-400/40 dark:hover:bg-violet-500/10 dark:hover:text-white"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
