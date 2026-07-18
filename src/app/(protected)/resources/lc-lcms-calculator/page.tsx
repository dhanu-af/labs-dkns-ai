import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CalibrationStandardsCalculator } from "@/components/resources/CalibrationStandardsCalculator";
import { SampleDilutionCalculator } from "@/components/resources/SampleDilutionCalculator";

export const metadata: Metadata = { title: "LC/LCMS Calibration & Dilution Calculator" };

export default function LcLcmsCalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "LC/LCMS Calibration & Dilution" },
        ]}
      />
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
        LC/LCMS Calibration & Dilution Calculator
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600 dark:text-white/60">
        Reproduces the Universal Sample Cal Sheet used for LC and LCMS work — calibration standard
        concentrations and sample dilution/specification conversions, calculated live as you edit any
        field. Add or remove rows for any analyte or sample.
      </p>

      <div className="mt-8 space-y-6">
        <CalibrationStandardsCalculator />
        <SampleDilutionCalculator />
      </div>
    </div>
  );
}
