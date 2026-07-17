"use client";

import { useState } from "react";

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
    <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
      <h3 className="font-medium">Statistics & uncertainty</h3>
      <p className="mt-1 text-xs text-black/50 dark:text-white/50">Enter values separated by commas or spaces.</p>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={2}
        className="mt-3 w-full rounded-md border border-black/15 bg-transparent px-2 py-1 text-sm dark:border-white/20"
      />
      <dl className="mt-3 grid grid-cols-4 gap-2 text-sm">
        <div className="rounded-md bg-black/[0.03] p-2 text-center dark:bg-white/[0.06]">
          <dt className="text-xs text-black/50 dark:text-white/50">n</dt>
          <dd className="font-medium">{n}</dd>
        </div>
        <div className="rounded-md bg-black/[0.03] p-2 text-center dark:bg-white/[0.06]">
          <dt className="text-xs text-black/50 dark:text-white/50">Mean</dt>
          <dd className="font-medium">{mean !== null ? mean.toPrecision(4) : "—"}</dd>
        </div>
        <div className="rounded-md bg-black/[0.03] p-2 text-center dark:bg-white/[0.06]">
          <dt className="text-xs text-black/50 dark:text-white/50">Std dev</dt>
          <dd className="font-medium">{stdev !== null ? stdev.toPrecision(4) : "—"}</dd>
        </div>
        <div className="rounded-md bg-black/[0.03] p-2 text-center dark:bg-white/[0.06]">
          <dt className="text-xs text-black/50 dark:text-white/50">%RSD</dt>
          <dd className="font-medium">{rsd !== null ? rsd.toPrecision(4) : "—"}</dd>
        </div>
      </dl>
    </div>
  );
}
