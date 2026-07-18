"use client";

import { useState } from "react";
import { FlaskConical } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { Input } from "@/components/ui/Input";

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
    <Card>
      <div className="flex items-center gap-3">
        <IconTile size="sm" gradient="linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)">
          <FlaskConical size={16} />
        </IconTile>
        <h3 className="font-semibold text-slate-900 dark:text-white">Molarity</h3>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Input label="Mass (g)" value={mass} onChange={(e) => setMass(e.target.value)} />
        <Input label="Molar mass (g/mol)" value={molarMass} onChange={(e) => setMolarMass(e.target.value)} />
        <Input label="Volume (mL)" value={volumeMl} onChange={(e) => setVolumeMl(e.target.value)} />
      </div>
      <p className="mt-4 text-sm">
        <span className="text-slate-500 dark:text-white/50">Molarity = </span>
        <span className="font-semibold text-slate-900 dark:text-white">
          {molarity !== null ? `${molarity.toPrecision(4)} mol/L` : "—"}
        </span>
      </p>
    </Card>
  );
}
