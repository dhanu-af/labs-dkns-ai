import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = { title: "Resources & Tools" };

const tools = [
  { title: "Unit Converters", href: "/resources/converters", description: "Concentration, temperature, and pressure conversions." },
  { title: "Calculators", href: "/resources/calculators", description: "Dilution, molarity, and statistics/uncertainty calculators." },
  { title: "LC/LCMS Calibration & Dilution", href: "/resources/lc-lcms-calculator", description: "Universal calibration standards and sample dilution/specification calculator." },
  { title: "Glossary of Terms", href: "/resources/glossary", description: "Definitions for common lab terminology." },
  { title: "Downloadable Templates", href: "/resources/templates", description: "SOPs, checklists, and calibration log templates." },
  { title: "Standards & Regulations Library", href: "/resources/standards", description: "ISO, ASTM, CLSI, and other reference standards." },
];

export default function ResourcesIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Resources & Tools</h1>
      <p className="mt-2 max-w-2xl text-slate-600 dark:text-white/60">
        Converters, calculators, glossary, templates, and the standards library.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Card key={tool.href} href={tool.href}>
            <p className="font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-violet-400">
              {tool.title}
            </p>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-white/55">{tool.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
