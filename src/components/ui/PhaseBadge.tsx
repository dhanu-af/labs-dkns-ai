import type { Phase } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";

const labels: Record<Phase, string> = {
  1: "Live",
  2: "Phase 2",
  3: "Phase 3",
};

export function PhaseBadge({ phase }: { phase: Phase }) {
  if (phase === 1) return null;
  return <Badge tone="neutral">{labels[phase]} — coming soon</Badge>;
}
