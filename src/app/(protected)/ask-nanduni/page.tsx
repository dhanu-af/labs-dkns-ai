import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AskNanduniClient } from "@/components/ask-nanduni/AskNanduniClient";
import { getSession, canEditContent } from "@/lib/auth";

export const metadata: Metadata = { title: "Ask Nanduni" };

export default async function AskNanduniPage() {
  const session = await getSession();
  const canManageKb = !!session && canEditContent(session.role);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Ask Nanduni" }]} />
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Ask Nanduni</h1>
      <p className="mt-2 text-slate-600 dark:text-white/60">
        Instant answers on equipment troubleshooting, calibration, method development, and compliance — pulled from a
        curated knowledge base, not a generic chatbot.
      </p>
      <div className="mt-8">
        <AskNanduniClient canManageKb={canManageKb} />
      </div>
    </div>
  );
}
