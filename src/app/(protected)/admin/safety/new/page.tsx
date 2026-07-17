import type { Metadata } from "next";
import { GuidePageForm } from "@/components/admin/GuidePageForm";

export const metadata: Metadata = { title: "Admin — New Safety Guide" };

export default function NewSafetyGuidePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">New safety guide page</h1>
      <div className="mt-6 max-w-2xl">
        <GuidePageForm />
      </div>
    </div>
  );
}
