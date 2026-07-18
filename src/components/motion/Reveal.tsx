"use client";

import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer } from "@/components/motion/variants";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  /** Set false for a single fade-up element with no staggered children. */
  as?: "container" | "item";
}

// Wraps the whileInView/stagger boilerplate that HeroSearch, ModuleCards,
// FeaturedCategories, and LatestArticles each used to duplicate by hand.
export function Reveal({ children, className, stagger, as = "container" }: RevealProps) {
  if (as === "item") {
    return (
      <motion.div variants={fadeUpItem} className={className}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
