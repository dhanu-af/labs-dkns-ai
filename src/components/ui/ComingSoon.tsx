import type { Phase } from "@/lib/site-config";
import { PhaseBadge } from "@/components/ui/PhaseBadge";

export function ComingSoon({
  title,
  phase,
  description,
  items,
}: {
  title: string;
  phase: Phase;
  description: string;
  items?: string[];
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <div className="mb-4 flex justify-center">
        <PhaseBadge phase={phase} />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 text-black/60 dark:text-white/60">{description}</p>
      {items && items.length > 0 && (
        <ul className="mt-8 grid gap-2 text-left text-sm text-black/70 sm:grid-cols-2 dark:text-white/70">
          {items.map((item) => (
            <li key={item} className="rounded-md border border-black/10 px-3 py-2 dark:border-white/10">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
