"use client";

import { useActionState } from "react";
import { createUserAccount } from "@/lib/actions/user-actions";

export function UserForm() {
  const [state, formAction, pending] = useActionState(createUserAccount, undefined);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300">
          {state.error}
        </div>
      )}

      <Field label="Username">
        <input name="username" required autoComplete="off" className="admin-input" />
      </Field>

      <Field label="Password (min. 8 characters)">
        <input name="password" type="password" required minLength={8} autoComplete="new-password" className="admin-input" />
      </Field>

      <Field label="Role">
        <select name="role" defaultValue="EDITOR" className="admin-input">
          <option value="EDITOR">Editor (can edit content)</option>
          <option value="SUPER_ADMIN">Super admin (can also manage accounts)</option>
          <option value="VIEWER">Viewer (view only, no downloads)</option>
        </select>
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="app-hero-glow rounded-full px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Creating…" : "Create account"}
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
