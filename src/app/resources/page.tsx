import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = { title: "Resources & Tools" };

const tools = [
  { title: "Unit Converters", href: "/resources/converters", description: "Concentration, temperature, and pressure conversions." },
  { title: "Calculators", href: "/resources/calculators", description: "Dilution, molarity, and statistics/uncertainty calculators." },
  { title: "Glossary of Terms", href: "/resources/glossary", description: "Definitions for common lab terminology." },
  { title: "Downloadable Templates", href: "/resources/templates", description: "SOPs, checklists, and calibration log templates." },
  { title: "Standards & Regulations Library", href: "/resources/standards", description: "ISO, ASTM, CLSI, and other reference standards." },
];

export default function ResourcesIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />
      <h1 className="text-3xl font-semibold tracking-tight">Resources & Tools</h1>
      <p className="mt-2 max-w-2xl text-black/60 dark:text-white/60">
        Converters, calculators, glossary, templates, and the standards library.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-lg border border-black/10 p-4 transition hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
          >
            <p className="font-medium">{tool.title}</p>
            <p className="mt-1 text-sm text-black/60 dark:text-white/60">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
