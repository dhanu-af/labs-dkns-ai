import type { Metadata } from "next";
import { KbEntryForm } from "@/components/admin/KbEntryForm";

export const metadata: Metadata = { title: "Admin — New Knowledge Base Entry" };

export default function NewKbEntryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">New knowledge base entry</h1>
      <div className="mt-6 max-w-xl">
        <KbEntryForm />
      </div>
    </div>
  );
}
