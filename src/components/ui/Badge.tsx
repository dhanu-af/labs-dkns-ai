import clsx from "clsx";

type Tone = "neutral" | "info" | "success" | "warning";

const tones: Record<Tone, string> = {
  neutral: "border-black/15 text-black/60 dark:border-white/20 dark:text-white/60",
  info: "border-indigo-200 text-indigo-600 dark:border-indigo-400/25 dark:text-indigo-300",
  success: "border-emerald-200 text-emerald-600 dark:border-emerald-400/25 dark:text-emerald-300",
  warning: "border-amber-200 text-amber-600 dark:border-amber-400/25 dark:text-amber-300",
};

interface BadgeProps {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}

// Generalizes PhaseBadge's pill styling into a reusable tone-based badge.
export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
