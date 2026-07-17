import type { Phase } from "@/lib/site-config";

const labels: Record<Phase, string> = {
  1: "Live",
  2: "Phase 2",
  3: "Phase 3",
};

export function PhaseBadge({ phase }: { phase: Phase }) {
  if (phase === 1) return null;
  return (
    <span className="inline-flex items-center rounded-full border border-black/15 px-2 py-0.5 text-xs font-medium text-black/60 dark:border-white/20 dark:text-white/60">
      {labels[phase]} — coming soon
    </span>
  );
}
