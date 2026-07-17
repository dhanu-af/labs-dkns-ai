import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Downloadable Templates" };

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Downloadable Templates" },
        ]}
      />
      <ComingSoon
        title="Downloadable Templates"
        phase={2}
        description="SOP templates, checklists, and calibration logs will be downloadable here once the SOP library ships."
        items={["SOP templates", "Checklists", "Calibration logs"]}
      />
    </div>
  );
}
