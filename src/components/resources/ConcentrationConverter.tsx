"use client";

import { useState } from "react";
import { Percent } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { Input } from "@/components/ui/Input";

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
    <Card>
      <div className="flex items-center gap-3">
        <IconTile size="sm" gradient="linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)">
          <Percent size={16} />
        </IconTile>
        <h3 className="font-semibold text-slate-900 dark:text-white">Concentration</h3>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Input label="mg/mL" type="number" value={mgPerMl} onChange={(e) => setMgPerMl(e.target.value)} />
        <Input label="Molar mass (g/mol)" type="number" value={molarMass} onChange={(e) => setMolarMass(e.target.value)} />
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-white/[0.04]">
          <dt className="text-xs text-slate-500 dark:text-white/50">% w/v</dt>
          <dd className="font-semibold text-slate-900 dark:text-white">{percentWV !== null ? percentWV.toPrecision(4) : "—"}</dd>
        </div>
        <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-white/[0.04]">
          <dt className="text-xs text-slate-500 dark:text-white/50">ppm</dt>
          <dd className="font-semibold text-slate-900 dark:text-white">{ppm !== null ? ppm.toPrecision(4) : "—"}</dd>
        </div>
        <div className="rounded-lg bg-slate-50 p-2 text-center dark:bg-white/[0.04]">
          <dt className="text-xs text-slate-500 dark:text-white/50">mol/L</dt>
          <dd className="font-semibold text-slate-900 dark:text-white">{molarity !== null ? molarity.toPrecision(4) : "—"}</dd>
        </div>
      </dl>
    </Card>
  );
}
