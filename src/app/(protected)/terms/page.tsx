import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <h1 className="text-3xl font-semibold tracking-tight">Terms of Use</h1>
      <p className="mt-4 text-black/70 dark:text-white/70">
        Placeholder — the full terms of use will be published here before launch.
      </p>
    </div>
  );
}
