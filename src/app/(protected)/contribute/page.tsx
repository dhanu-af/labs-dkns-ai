import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = { title: "Contribute" };

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contribute" }]} />
      <h1 className="text-3xl font-semibold tracking-tight">Contribute</h1>
      <p className="mt-4 text-black/70 dark:text-white/70">
        Spotted an error, missing spec, or an equipment/method entry we should add? Contribution guidelines and a
        submission process will be published here.
      </p>
    </div>
  );
}
