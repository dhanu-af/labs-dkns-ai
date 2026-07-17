import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = { title: "Lab Management" };

export default function LabManagementPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Lab Management" }]} />
      <ComingSoon
        title="Lab Management"
        phase={2}
        description="Quality systems, operations, finance & procurement, and personnel guidance for running a lab."
        items={[
          "Quality systems (ISO/IEC 17025, GLP, GMP, accreditation)",
          "Operations (inventory, calibration schedules, training records, LIMS)",
          "Finance & procurement (budgeting, vendor evaluation)",
          "Personnel (roles, responsibilities, training program design)",
        ]}
      />
    </div>
  );
}
