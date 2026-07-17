"use client";

import { useState } from "react";

// mass (g) = molarity (mol/L) * volume (L) * molar mass (g/mol)
export function MolarityCalculator() {
  const [mass, setMass] = useState("5.844");
  const [molarMass, setMolarMass] = useState("58.44");
  const [volumeMl, setVolumeMl] = useState("1000");

  const massG = Number(mass);
  const mm = Number(molarMass);
  const volumeL = Number(volumeMl) / 1000;
  const valid = Number.isFinite(massG) && Number.isFinite(mm) && mm > 0 && Number.isFinite(volumeL) && volumeL > 0;
  const molarity = valid ? massG / mm / volumeL : null;

  return (
    <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
      <h3 className="font-medium">Molarity</h3>
      <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
        <label className="flex flex-col gap-1">
          Mass (g)
          <input value={mass} onChange={(e) => setMass(e.target.value)} className="rounded-md border border-black/15 bg-transparent px-2 py-1 dark:border-white/20" />
        </label>
        <label className="flex flex-col gap-1">
          Molar mass (g/mol)
          <input value={molarMass} onChange={(e) => setMolarMass(e.target.value)} className="rounded-md border border-black/15 bg-transparent px-2 py-1 dark:border-white/20" />
        </label>
        <label className="flex flex-col gap-1">
          Volume (mL)
          <input value={volumeMl} onChange={(e) => setVolumeMl(e.target.value)} className="rounded-md border border-black/15 bg-transparent px-2 py-1 dark:border-white/20" />
        </label>
      </div>
      <p className="mt-3 text-sm">
        <span className="text-black/50 dark:text-white/50">Molarity = </span>
        <span className="font-medium">{molarity !== null ? `${molarity.toPrecision(4)} mol/L` : "—"}</span>
      </p>
    </div>
  );
}
