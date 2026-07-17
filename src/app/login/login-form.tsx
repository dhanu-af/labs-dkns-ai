"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/lib/actions/auth-actions";

export default function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(loginAction, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-emerald-50/80">User ID</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-100/35">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <input
            name="username"
            type="text"
            required
            autoFocus
            autoComplete="username"
            placeholder="Enter your User ID"
            className="auth-input w-full rounded-xl py-2.5 pl-9 pr-3 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-emerald-50/80">Password</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-100/35">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="auth-input w-full rounded-xl py-2.5 pl-9 pr-14 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-emerald-100/45 transition hover:text-emerald-100/80"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-emerald-50/70">
        <input
          name="remember"
          type="checkbox"
          className="h-4 w-4 rounded border-emerald-400/40 bg-white/5 accent-emerald-400"
        />
        Remember me
      </label>

      {state?.error && (
        <div
          className="flex items-start gap-2 rounded-xl border px-3 py-2 text-sm"
          style={{
            background: "rgba(248,113,113,0.08)",
            borderColor: "rgba(248,113,113,0.25)",
            color: "#fca5a5",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 8v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="12" cy="16" r="0.9" fill="currentColor" />
          </svg>
          <span>{state.error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full py-2.5 text-sm font-semibold text-emerald-950 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:active:scale-100"
        style={{
          background: "linear-gradient(90deg, #34d399 0%, #2dd4bf 100%)",
          boxShadow: "0 8px 28px -8px rgba(45,212,191,0.55)",
        }}
      >
        {pending && (
          <svg className="auth-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}
        {pending ? "Signing in…" : "Log in"}
      </button>
    </form>
  );
}
