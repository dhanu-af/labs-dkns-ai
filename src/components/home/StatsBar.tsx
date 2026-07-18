"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { staggerContainer, fadeUpItem } from "@/components/motion/variants";
import type { SiteStats } from "@/lib/content/stats";

const tiles: { key: keyof SiteStats; label: string }[] = [
  { key: "equipment", label: "Equipment entries" },
  { key: "methods", label: "Methods & techniques" },
  { key: "standards", label: "Standards referenced" },
  { key: "glossaryTerms", label: "Glossary terms" },
];

// Real content counts, animated on mount -- there's no usage/analytics data
// behind this site, so this is the honest, buildable version of "interactive
// statistics" for a content reference hub.
export function StatsBar({ stats }: { stats: SiteStats }) {
  return (
    <section className="border-b border-slate-900/[0.06] px-6 py-10 dark:border-white/10">
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {tiles.map((tile) => (
          <motion.div
            key={tile.key}
            variants={fadeUpItem}
            className="rounded-2xl border border-slate-900/[0.07] bg-white/60 p-5 text-center dark:border-white/10 dark:bg-white/[0.03]"
          >
            <p
              className="text-3xl font-bold sm:text-4xl"
              style={{
                backgroundImage: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              <AnimatedCounter value={stats[tile.key]} suffix="+" />
            </p>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-white/60">{tile.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
