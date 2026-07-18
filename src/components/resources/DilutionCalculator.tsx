"use client";

import { useState } from "react";
import { Droplets } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { Input } from "@/components/ui/Input";

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
    <Card>
      <div className="flex items-center gap-3">
        <IconTile size="sm" gradient="linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)">
          <Droplets size={16} />
        </IconTile>
        <h3 className="font-semibold text-slate-900 dark:text-white">Dilution (C₁V₁ = C₂V₂)</h3>
      </div>
      <p className="mt-1.5 text-xs text-slate-500 dark:text-white/50">Leave exactly one field blank to solve for it.</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Input label="C1 (stock conc.)" value={c1} onChange={(e) => setC1(e.target.value)} />
        <Input label="V1 (stock volume)" value={v1} onChange={(e) => setV1(e.target.value)} />
        <Input label="C2 (final conc.)" value={c2} onChange={(e) => setC2(e.target.value)} />
        <Input label="V2 (final volume)" value={v2} onChange={(e) => setV2(e.target.value)} />
      </div>
      <p className="mt-4 text-sm">
        {result ? (
          <>
            <span className="text-slate-500 dark:text-white/50">{result.label} = </span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {Number.isFinite(result.value) ? result.value.toPrecision(4) : "—"}
            </span>
          </>
        ) : (
          <span className="text-slate-400 dark:text-white/40">Leave one field blank to see the result.</span>
        )}
      </p>
    </Card>
  );
}
