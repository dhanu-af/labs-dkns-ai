"use client";

import { useActionState } from "react";
import { saveGuidePage } from "@/lib/actions/admin-actions";
import type { GuidePage } from "@prisma/client";

export function GuidePageForm({ initial }: { initial?: GuidePage }) {
  const [state, formAction, pending] = useActionState(saveGuidePage, undefined);

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

      <Field label="Summary">
        <textarea name="summary" defaultValue={initial?.summary ?? ""} rows={2} className="admin-input" />
      </Field>

      <Field label="Body">
        <textarea name="body" defaultValue={initial?.body} required rows={6} className="admin-input" />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Order (lower shows first)">
          <input name="order" type="number" defaultValue={initial?.order ?? 0} className="admin-input" />
        </Field>
        <Field label="Status">
          <select name="status" defaultValue={initial?.status ?? "PUBLISHED"} className="admin-input">
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </Field>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="app-hero-glow rounded-full px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save page"}
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
