"use client";

import { motion } from "framer-motion";
import { SearchBar } from "@/components/layout/SearchBar";
import { Button } from "@/components/ui/Button";
import { EASE_STANDARD } from "@/components/motion/variants";

const quickLinks = [
  { label: "Browse Equipment", href: "/equipment" },
  { label: "Browse Methods", href: "/methods" },
  { label: "Lab Management", href: "/lab-management" },
];

export function HeroSearch() {
  return (
    <section className="relative overflow-hidden border-b border-slate-900/[0.06] px-6 py-24 sm:py-28 dark:border-white/10">
      {/* Animated aurora + dot-grid background -- the hero's one deliberately
          rich moment; glass/noise elsewhere on the page stay subtle. */}
      <div className="pointer-events-none absolute inset-0 bg-slate-50 dark:bg-[#0b0d14]">
        <div
          className="aurora-blob aurora-blob-1"
          style={{
            top: "-20%",
            left: "5%",
            width: "36rem",
            height: "36rem",
            background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(99,102,241,0) 70%)",
          }}
        />
        <div
          className="aurora-blob aurora-blob-2"
          style={{
            top: "-10%",
            right: "0%",
            width: "32rem",
            height: "32rem",
            background: "radial-gradient(circle, rgba(139,92,246,0.20) 0%, rgba(139,92,246,0) 70%)",
          }}
        />
        <div
          className="aurora-blob aurora-blob-3"
          style={{
            bottom: "-25%",
            left: "35%",
            width: "30rem",
            height: "30rem",
            background: "radial-gradient(circle, rgba(236,72,153,0.14) 0%, rgba(236,72,153,0) 70%)",
          }}
        />
        <div className="app-dot-grid absolute inset-0" />
        <div className="app-noise absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-[#0b0d14]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_STANDARD }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-900/[0.08] bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.06] dark:text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Reference hub for lab operations
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
          Everything your lab
          <br />
          <span className="app-hero-glow bg-clip-text text-transparent">needs to know</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-balance text-base text-slate-600 sm:text-lg dark:text-white/60">
          Equipment specs, methods, SOPs, and lab management guidance — in one reference hub.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE_STANDARD }}
          className="mx-auto mt-9 max-w-xl"
        >
          <SearchBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE_STANDARD }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm"
        >
          {quickLinks.map((link) => (
            <motion.div key={link.href} whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                href={link.href}
                variant="secondary"
                className="border-slate-900/[0.08] bg-white/70 text-slate-700 shadow-sm backdrop-blur hover:border-indigo-300/60 hover:bg-white hover:text-indigo-600 dark:bg-white/[0.04] dark:text-white/75 dark:hover:border-violet-400/40 dark:hover:bg-white/[0.08] dark:hover:text-white"
              >
                {link.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
