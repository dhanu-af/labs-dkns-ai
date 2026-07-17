"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/35">
        <svg width={compact ? 15 : 18} height={compact ? 15 : 18} viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search equipment, methods, SOPs…"
        className={`app-search-shadow w-full rounded-full border border-slate-900/[0.08] bg-white text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/35 dark:focus:border-violet-400/50 dark:focus:ring-violet-500/15 ${
          compact ? "py-1.5 pl-9 pr-3 text-sm" : "py-3.5 pl-12 pr-28 text-[15px]"
        }`}
      />
      {!compact && (
        <button
          type="submit"
          className="app-hero-glow app-pill absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full px-5 py-2 text-sm font-semibold text-white hover:brightness-110"
        >
          Search
        </button>
      )}
    </form>
  );
}
