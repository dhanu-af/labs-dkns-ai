"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CategoryNode } from "@/lib/content/categories";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";
import { fadeUpItem, staggerContainer } from "@/components/motion/variants";

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
      <SectionHeading title={title} viewAllHref={basePath} className="mb-6" />
      <motion.div
        variants={staggerContainer(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={fadeUpItem}
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
                  <Pill
                    key={sub.id}
                    href={`${basePath}/${sub.slug}`}
                    className="bg-slate-50 hover:border-indigo-300/60 hover:bg-indigo-50 hover:text-indigo-700 dark:bg-white/[0.04] dark:hover:border-violet-400/40 dark:hover:bg-violet-500/10 dark:hover:text-white"
                  >
                    {sub.name}
                  </Pill>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
