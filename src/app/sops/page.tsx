import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "SOPs & Procedures" };

export default function SopsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "SOPs" }]} />
      <ComingSoon
        title="SOPs & Procedures"
        phase={2}
        description="A library of standard operating procedures, downloadable templates, and document control guidance."
        items={[
          "SOP library (sample handling, equipment operation, cleaning, waste disposal)",
          "Downloadable SOP templates",
          "Document control guidance (versioning, approval workflows)",
          "Sample chain-of-custody procedures",
        ]}
      />
    </div>
  );
}
