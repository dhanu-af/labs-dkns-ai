import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PhaseBadge } from "@/components/ui/PhaseBadge";

export const metadata: Metadata = { title: "Newsletter" };

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Newsletter" }]} />
      <div className="mb-4">
        <PhaseBadge phase={3} />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight">Newsletter</h1>
      <p className="mt-4 text-black/70 dark:text-white/70">
        Newsletter signup launches alongside the blog in Phase 3.
      </p>
    </div>
  );
}
