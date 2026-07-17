import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ConcentrationConverter } from "@/components/resources/ConcentrationConverter";
import { TemperatureConverter } from "@/components/resources/TemperatureConverter";
import { PressureConverter } from "@/components/resources/PressureConverter";

export const metadata: Metadata = { title: "Unit Converters" };

export default function ConvertersPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Unit Converters" },
        ]}
      />
      <h1 className="text-3xl font-semibold tracking-tight">Unit Converters</h1>
      <div className="mt-8 space-y-4">
        <ConcentrationConverter />
        <TemperatureConverter />
        <PressureConverter />
      </div>
    </div>
  );
}
