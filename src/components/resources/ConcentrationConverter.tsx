"use client";

import { useState } from "react";

// Base unit: mg/mL. Molarity requires a molar mass (g/mol) since
// mg/mL == g/L == molarity(mol/L) * molarMass(g/mol).
export function ConcentrationConverter() {
  const [mgPerMl, setMgPerMl] = useState("10");
  const [molarMass, setMolarMass] = useState("58.44"); // NaCl, as a default example

  const base = Number(mgPerMl);
  const mm = Number(molarMass);
  const valid = Number.isFinite(base);
  const percentWV = valid ? base / 10 : null;
  const ppm = valid ? base / 0.001 : null;
  const molarity = valid && Number.isFinite(mm) && mm > 0 ? base / mm : null;

  return (
    <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
      <h3 className="font-medium">Concentration</h3>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <label className="flex items-center gap-2">
          mg/mL
          <input
            type="number"
            value={mgPerMl}
            onChange={(e) => setMgPerMl(e.target.value)}
            className="w-24 rounded-md border border-black/15 bg-transparent px-2 py-1 dark:border-white/20"
          />
        </label>
        <label className="flex items-center gap-2">
          Molar mass (g/mol)
          <input
            type="number"
            value={molarMass}
            onChange={(e) => setMolarMass(e.target.value)}
            className="w-24 rounded-md border border-black/15 bg-transparent px-2 py-1 dark:border-white/20"
          />
        </label>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
        <div className="rounded-md bg-black/[0.03] p-2 text-center dark:bg-white/[0.06]">
          <dt className="text-xs text-black/50 dark:text-white/50">% w/v</dt>
          <dd className="font-medium">{percentWV !== null ? percentWV.toPrecision(4) : "—"}</dd>
        </div>
        <div className="rounded-md bg-black/[0.03] p-2 text-center dark:bg-white/[0.06]">
          <dt className="text-xs text-black/50 dark:text-white/50">ppm</dt>
          <dd className="font-medium">{ppm !== null ? ppm.toPrecision(4) : "—"}</dd>
        </div>
        <div className="rounded-md bg-black/[0.03] p-2 text-center dark:bg-white/[0.06]">
          <dt className="text-xs text-black/50 dark:text-white/50">mol/L</dt>
          <dd className="font-medium">{molarity !== null ? molarity.toPrecision(4) : "—"}</dd>
        </div>
      </dl>
    </div>
  );
}
