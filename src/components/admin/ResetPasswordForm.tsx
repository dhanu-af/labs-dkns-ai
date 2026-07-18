"use client";

import { useActionState, useState } from "react";
import { resetUserPassword } from "@/lib/actions/user-actions";

export function ResetPasswordForm({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(resetUserPassword, undefined);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[0.06]"
      >
        Reset password
      </button>
    );
  }

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="id" value={userId} />
      <input
        name="newPassword"
        type="password"
        required
        minLength={8}
        autoComplete="new-password"
        placeholder="New password (min. 8 chars)"
        className="admin-input w-44 py-1 text-xs"
      />
      {state?.error && <span className="text-xs text-red-600 dark:text-red-400">{state.error}</span>}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/[0.06]"
      >
        {pending ? "Saving…" : "Save"}
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="text-xs text-slate-400 hover:text-slate-600 dark:text-white/40 dark:hover:text-white/70"
      >
        Cancel
      </button>
    </form>
  );
}
