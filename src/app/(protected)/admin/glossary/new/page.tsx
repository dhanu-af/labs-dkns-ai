import type { Metadata } from "next";
import { GlossaryForm } from "@/components/admin/GlossaryForm";

export const metadata: Metadata = { title: "Admin — New Glossary Term" };

export default function NewGlossaryTermPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">New glossary term</h1>
      <div className="mt-6 max-w-xl">
        <GlossaryForm />
      </div>
    </div>
  );
}
