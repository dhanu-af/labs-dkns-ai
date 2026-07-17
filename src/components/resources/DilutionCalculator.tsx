"use client";

import { useState } from "react";

// C1V1 = C2V2, solving for whichever field is left blank.
export function DilutionCalculator() {
  const [c1, setC1] = useState("10");
  const [v1, setV1] = useState("");
  const [c2, setC2] = useState("1");
  const [v2, setV2] = useState("100");

  let result: { label: string; value: number } | null = null;
  if (v1 === "" && c1 && v2 && c2) {
    result = { label: "V1", value: (Number(c2) * Number(v2)) / Number(c1) };
  } else if (c1 && v1 && c2 && v2 === "") {
    result = { label: "V2 (final volume)", value: (Number(c1) * Number(v1)) / Number(c2) };
  } else if (c1 && v1 && v2 && c2 === "") {
    result = { label: "C2", value: (Number(c1) * Number(v1)) / Number(v2) };
  } else if (v1 && v2 && c2 && c1 === "") {
    result = { label: "C1", value: (Number(c2) * Number(v2)) / Number(v1) };
  }

  return (
    <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
      <h3 className="font-medium">Dilution (C₁V₁ = C₂V₂)</h3>
      <p className="mt-1 text-xs text-black/50 dark:text-white/50">Leave exactly one field blank to solve for it.</p>
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <label className="flex flex-col gap-1">
          C1 (stock conc.)
          <input value={c1} onChange={(e) => setC1(e.target.value)} className="rounded-md border border-black/15 bg-transparent px-2 py-1 dark:border-white/20" />
        </label>
        <label className="flex flex-col gap-1">
          V1 (stock volume)
          <input value={v1} onChange={(e) => setV1(e.target.value)} className="rounded-md border border-black/15 bg-transparent px-2 py-1 dark:border-white/20" />
        </label>
        <label className="flex flex-col gap-1">
          C2 (final conc.)
          <input value={c2} onChange={(e) => setC2(e.target.value)} className="rounded-md border border-black/15 bg-transparent px-2 py-1 dark:border-white/20" />
        </label>
        <label className="flex flex-col gap-1">
          V2 (final volume)
          <input value={v2} onChange={(e) => setV2(e.target.value)} className="rounded-md border border-black/15 bg-transparent px-2 py-1 dark:border-white/20" />
        </label>
      </div>
      <p className="mt-3 text-sm">
        {result ? (
          <>
            <span className="text-black/50 dark:text-white/50">{result.label} = </span>
            <span className="font-medium">{Number.isFinite(result.value) ? result.value.toPrecision(4) : "—"}</span>
          </>
        ) : (
          <span className="text-black/40 dark:text-white/40">Leave one field blank to see the result.</span>
        )}
      </p>
    </div>
  );
}
