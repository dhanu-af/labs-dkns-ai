"use client";

import { useActionState } from "react";
import { saveMethod } from "@/lib/actions/admin-actions";
import type { CategoryNode } from "@/lib/content/categories";
import type { Method, StandardReference } from "@prisma/client";

type MethodWithStandards = Method & { standards: StandardReference[] };

export function MethodForm({
  initial,
  categories,
  standards,
}: {
  initial?: MethodWithStandards;
  categories: CategoryNode[];
  standards: StandardReference[];
}) {
  const [state, formAction, pending] = useActionState(saveMethod, undefined);
  const selectedStandardIds = new Set(initial?.standards.map((s) => s.id) ?? []);

  return (
    <form action={formAction} className="space-y-5">
      {initial && <input type="hidden" name="id" value={initial.id} />}

      {state?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300">
          {state.error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input name="name" defaultValue={initial?.name} required className="admin-input" />
        </Field>
        <Field label="Slug (optional — derived from name if blank)">
          <input name="slug" defaultValue={initial?.slug} className="admin-input" />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Category">
          <select name="categoryId" defaultValue={initial?.categoryId} required className="admin-input">
            <option value="" disabled>
              Select a category…
            </option>
            {categories.map((group) => (
              <optgroup key={group.id} label={group.name}>
                <option value={group.id}>{group.name} (group)</option>
                {group.children.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select name="status" defaultValue={initial?.status ?? "PUBLISHED"} className="admin-input">
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </Field>
      </div>

      <Field label="Summary (short, used in listings)">
        <textarea name="summary" defaultValue={initial?.summary} required rows={2} className="admin-input" />
      </Field>

      <Field label="Principle">
        <textarea name="principle" defaultValue={initial?.principle} required rows={3} className="admin-input" />
      </Field>

      <Field label="Step-by-step procedure">
        <textarea name="procedure" defaultValue={initial?.procedure} required rows={5} className="admin-input" />
      </Field>

      <Field label="Required equipment & reagents">
        <textarea
          name="requiredEquipment"
          defaultValue={initial?.requiredEquipment ?? ""}
          rows={2}
          className="admin-input"
        />
      </Field>

      <Field label="Applications & industries">
        <textarea name="applications" defaultValue={initial?.applications ?? ""} rows={2} className="admin-input" />
      </Field>

      <Field label="Common errors & troubleshooting">
        <textarea
          name="troubleshooting"
          defaultValue={initial?.troubleshooting ?? ""}
          rows={3}
          className="admin-input"
        />
      </Field>

      {standards.length > 0 && (
        <Field label="Relevant standards">
          <div className="flex flex-wrap gap-3">
            {standards.map((s) => (
              <label key={s.id} className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-white/70">
                <input
                  type="checkbox"
                  name="standardIds"
                  value={s.id}
                  defaultChecked={selectedStandardIds.has(s.id)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                {s.code}
              </label>
            ))}
          </div>
        </Field>
      )}

      <button
        type="submit"
        disabled={pending}
        className="app-hero-glow rounded-full px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save method"}
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
