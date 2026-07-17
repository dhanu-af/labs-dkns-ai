import type { Metadata } from "next";
import { StandardForm } from "@/components/admin/StandardForm";

export const metadata: Metadata = { title: "Admin — New Standard" };

export default function NewStandardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">New standard</h1>
      <div className="mt-6 max-w-xl">
        <StandardForm />
      </div>
    </div>
  );
}
