"use client";

import { useState } from "react";
import { Sigma } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";

function parseNumbers(input: string): number[] {
  return input
    .split(/[\s,]+/)
    .map((s) => Number(s))
    .filter((n) => Number.isFinite(n));
}

export function StatisticsCalculator() {
  const [input, setInput] = useState("10.1, 10.3, 9.9, 10.2, 10.0");
  const values = parseNumbers(input);
  const n = values.length;
  const mean = n > 0 ? values.reduce((a, b) => a + b, 0) / n : null;
  const stdev =
    n > 1 && mean !== null
      ? Math.sqrt(values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / (n - 1))
      : null;
  const rsd = mean && stdev !== null && mean !== 0 ? (stdev / mean) * 100 : null;

  return (
    <Card>
      <div className="flex items-center gap-3">
        <IconTile size="sm" gradient="linear-gradient(135deg, #d946ef 0%, #ec4899 100%)">
          <Sigma size={16} />
        </IconTile>
        <h3 className="font-semibold text-slate-900 dark:text-white">Statistics & uncertainty</h3>
      </div>
      <p className="mt-1.5 text-xs text-slate-500 dark:text-white/50">Enter values separated by commas or spaces.</p>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={2}
        className="mt-4 w-full rounded-lg border border-slate-900/[0.1] bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-violet-400/50 dark:focus:ring-violet-500/15"
      />
      <dl className="mt-4 grid grid-cols-4 gap-2 text-sm">
        <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-white/[0.04]">
          <dt className="text-xs text-slate-500 dark:text-white/50">n</dt>
          <dd className="font-semibold text-slate-900 dark:text-white">{n}</dd>
        </div>
        <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-white/[0.04]">
          <dt className="text-xs text-slate-500 dark:text-white/50">Mean</dt>
          <dd className="font-semibold text-slate-900 dark:text-white">{mean !== null ? mean.toPrecision(4) : "—"}</dd>
        </div>
        <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-white/[0.04]">
          <dt className="text-xs text-slate-500 dark:text-white/50">Std dev</dt>
          <dd className="font-semibold text-slate-900 dark:text-white">{stdev !== null ? stdev.toPrecision(4) : "—"}</dd>
        </div>
        <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-white/[0.04]">
          <dt className="text-xs text-slate-500 dark:text-white/50">%RSD</dt>
          <dd className="font-semibold text-slate-900 dark:text-white">{rsd !== null ? rsd.toPrecision(4) : "—"}</dd>
        </div>
      </dl>
    </Card>
  );
}
