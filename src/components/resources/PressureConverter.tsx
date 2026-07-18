"use client";

import { useState } from "react";
import { Gauge } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { Input } from "@/components/ui/Input";

const toPascal: Record<string, number> = {
  Pa: 1,
  kPa: 1_000,
  bar: 100_000,
  atm: 101_325,
  psi: 6_894.76,
  mmHg: 133.322,
};

const units = Object.keys(toPascal);

const selectClasses =
  "rounded-lg border border-slate-900/[0.1] bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-violet-400/50 dark:focus:ring-violet-500/15";

export function PressureConverter() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("atm");

  const numeric = Number(value);
  const pascals = Number.isFinite(numeric) ? numeric * toPascal[from] : null;

  return (
    <Card>
      <div className="flex items-center gap-3">
        <IconTile size="sm" gradient="linear-gradient(135deg, #f59e0b 0%, #f97316 100%)">
          <Gauge size={16} />
        </IconTile>
        <h3 className="font-semibold text-slate-900 dark:text-white">Pressure</h3>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-32" />
        <select value={from} onChange={(e) => setFrom(e.target.value)} className={selectClasses}>
          {units.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
        {units.map((u) => (
          <div key={u} className="rounded-lg bg-slate-50 p-2 text-center dark:bg-white/[0.04]">
            <dt className="text-xs text-slate-500 dark:text-white/50">{u}</dt>
            <dd className="font-semibold text-slate-900 dark:text-white">
              {pascals !== null ? (pascals / toPascal[u]).toPrecision(4) : "—"}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
