"use client";

import { useActionState } from "react";
import { saveKbEntry } from "@/lib/actions/kb-actions";
import { KB_CATEGORY_LABEL, KB_CATEGORY_ORDER } from "@/lib/kb-labels";
import type { KnowledgeEntry } from "@prisma/client";

export function KbEntryForm({ initial }: { initial?: KnowledgeEntry }) {
  const [state, formAction, pending] = useActionState(saveKbEntry, undefined);

  return (
    <form action={formAction} className="space-y-5">
      {initial && <input type="hidden" name="id" value={initial.id} />}

      {state?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300">
          {state.error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title">
          <input name="title" defaultValue={initial?.title} required className="admin-input" />
        </Field>
        <Field label="Slug (optional — derived from title if blank)">
          <input name="slug" defaultValue={initial?.slug} className="admin-input" />
        </Field>
      </div>

      <Field label="Category">
        <select name="category" defaultValue={initial?.category ?? KB_CATEGORY_ORDER[0]} required className="admin-input">
          {KB_CATEGORY_ORDER.map((c) => (
            <option key={c} value={c}>
              {KB_CATEGORY_LABEL[c]}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Keywords (comma-separated — matched against questions alongside the title)">
        <input name="keywords" defaultValue={initial?.keywords} required className="admin-input" />
      </Field>

      <Field label="Likely cause (optional)">
        <textarea name="cause" defaultValue={initial?.cause ?? ""} rows={2} className="admin-input" />
      </Field>

      <Field label="Answer">
        <textarea name="answer" defaultValue={initial?.answer} required rows={5} className="admin-input" />
      </Field>

      <Field label="Source (optional)">
        <input name="source" defaultValue={initial?.source ?? ""} className="admin-input" />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="app-hero-glow rounded-full px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save entry"}
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
