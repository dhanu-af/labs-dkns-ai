import type { Prisma } from "@prisma/client";

export function SpecTable({ specifications }: { specifications: Prisma.JsonValue }) {
  if (!specifications || typeof specifications !== "object" || Array.isArray(specifications)) return null;
  const entries = Object.entries(specifications as Record<string, unknown>);
  if (entries.length === 0) return null;

  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-xl border border-slate-900/[0.07] bg-slate-50 p-4 sm:grid-cols-2 dark:border-white/10 dark:bg-white/[0.02]">
      {entries.map(([key, value]) => (
        <div key={key} className="flex flex-col">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-white/40">{key}</dt>
          <dd className="text-sm text-slate-800 dark:text-white/85">{String(value)}</dd>
        </div>
      ))}
    </dl>
  );
}
