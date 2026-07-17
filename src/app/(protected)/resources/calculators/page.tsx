import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DilutionCalculator } from "@/components/resources/DilutionCalculator";
import { MolarityCalculator } from "@/components/resources/MolarityCalculator";
import { StatisticsCalculator } from "@/components/resources/StatisticsCalculator";

export const metadata: Metadata = { title: "Calculators" };

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Calculators" },
        ]}
      />
      <h1 className="text-3xl font-semibold tracking-tight">Calculators</h1>
      <div className="mt-8 space-y-4">
        <DilutionCalculator />
        <MolarityCalculator />
        <StatisticsCalculator />
      </div>
    </div>
  );
}
