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
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search equipment, methods, SOPs…"
        className={`w-full rounded-md border border-black/15 bg-white px-3 text-sm text-black outline-none placeholder:text-black/40 focus:border-black/40 dark:border-white/20 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus:border-white/40 ${
          compact ? "py-1.5" : "py-3"
        }`}
      />
      <button
        type="submit"
        className="shrink-0 rounded-md bg-black px-4 py-1.5 text-sm font-medium text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
      >
        Search
      </button>
    </form>
  );
}
