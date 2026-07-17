"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { PhaseBadge } from "@/components/ui/PhaseBadge";
import type { Phase } from "@/lib/site-config";

interface Module {
  title: string;
  description: string;
  href: string;
  phase: Phase;
  gradient: string;
  icon: React.ReactNode;
}

const modules: Module[] = [
  {
    title: "Equipment & Instruments",
    description: "Specs, working principles, manufacturers, and buying guides for analytical and general lab equipment.",
    href: "/equipment",
    phase: 1,
    gradient: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
    icon: (
      <path
        d="M9 3h6M10 3v5.5L5.5 17a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 8.5V3M8 14h8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Methods & Techniques",
    description: "Step-by-step procedures, required equipment, troubleshooting, and the standards behind each method.",
    href: "/methods",
    phase: 1,
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
    icon: (
      <path
        d="M4 6h16M4 12h10M4 18h13M17 15l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "SOPs & Procedures",
    description: "A library of standard operating procedures, downloadable templates, and document control guidance.",
    href: "/sops",
    phase: 2,
    gradient: "linear-gradient(135deg, #d946ef 0%, #ec4899 100%)",
    icon: (
      <path
        d="M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM9 8h6M9 12h6M9 16h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Lab Management",
    description: "Quality systems, operations, calibration schedules, and the roles that keep a lab running.",
    href: "/lab-management",
    phase: 2,
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
    icon: (
      <path
        d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 11h.01M15 11h.01M9 15h.01M15 15h.01"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function ModuleCards() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          Explore the platform
        </h2>
        <p className="mt-2 text-slate-600 dark:text-white/60">
          Everything you need, organized the way a lab actually runs.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {modules.map((mod) => (
          <motion.div key={mod.href} variants={item} whileHover={{ y: -4 }} className="app-ring-wrap h-full">
            <Link
              href={mod.href}
              className="app-ring-inner app-card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-900/[0.07] bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"
            >
              {mod.phase !== 1 && (
                <div className="absolute right-4 top-4">
                  <PhaseBadge phase={mod.phase} />
                </div>
              )}
              <motion.span
                whileHover={{ rotate: -6, scale: 1.12 }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm"
                style={{ background: mod.gradient }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  {mod.icon}
                </svg>
              </motion.span>
              <p className="mt-4 font-semibold text-slate-900 dark:text-white">{mod.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-white/55">{mod.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-violet-400">
                Explore
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
