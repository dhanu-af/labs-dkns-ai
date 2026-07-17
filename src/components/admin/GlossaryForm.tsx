"use client";

import { useActionState } from "react";
import { saveGlossaryTerm } from "@/lib/actions/admin-actions";
import type { GlossaryTerm } from "@prisma/client";

export function GlossaryForm({ initial }: { initial?: GlossaryTerm }) {
  const [state, formAction, pending] = useActionState(saveGlossaryTerm, undefined);

  return (
    <form action={formAction} className="space-y-5">
      {initial && <input type="hidden" name="id" value={initial.id} />}

      {state?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300">
          {state.error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Term">
          <input name="term" defaultValue={initial?.term} required className="admin-input" />
        </Field>
        <Field label="Slug (optional — derived from term if blank)">
          <input name="slug" defaultValue={initial?.slug} className="admin-input" />
        </Field>
      </div>

      <Field label="Definition">
        <textarea name="definition" defaultValue={initial?.definition} required rows={3} className="admin-input" />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="app-hero-glow rounded-full px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save term"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-white/75">{label}</span>
      {children}
    </label>
  );
}
