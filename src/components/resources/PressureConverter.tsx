"use client";

import { useState } from "react";

const toPascal: Record<string, number> = {
  Pa: 1,
  kPa: 1_000,
  bar: 100_000,
  atm: 101_325,
  psi: 6_894.76,
  mmHg: 133.322,
};

const units = Object.keys(toPascal);

export function PressureConverter() {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("atm");

  const numeric = Number(value);
  const pascals = Number.isFinite(numeric) ? numeric * toPascal[from] : null;

  return (
    <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
      <h3 className="font-medium">Pressure</h3>
      <div className="mt-3 flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-32 rounded-md border border-black/15 bg-transparent px-2 py-1 text-sm dark:border-white/20"
        />
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="rounded-md border border-black/15 bg-transparent px-2 py-1 text-sm dark:border-white/20"
        >
          {units.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
        {units.map((u) => (
          <div key={u} className="rounded-md bg-black/[0.03] p-2 text-center dark:bg-white/[0.06]">
            <dt className="text-xs text-black/50 dark:text-white/50">{u}</dt>
            <dd className="font-medium">{pascals !== null ? (pascals / toPascal[u]).toPrecision(4) : "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
