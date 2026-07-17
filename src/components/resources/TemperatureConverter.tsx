"use client";

import { useState } from "react";

type Unit = "C" | "F" | "K";

function toCelsius(value: number, unit: Unit): number {
  if (unit === "C") return value;
  if (unit === "F") return ((value - 32) * 5) / 9;
  return value - 273.15;
}

function fromCelsius(celsius: number, unit: Unit): number {
  if (unit === "C") return celsius;
  if (unit === "F") return (celsius * 9) / 5 + 32;
  return celsius + 273.15;
}

const units: Unit[] = ["C", "F", "K"];

export function TemperatureConverter() {
  const [value, setValue] = useState("25");
  const [from, setFrom] = useState<Unit>("C");

  const numeric = Number(value);
  const celsius = Number.isFinite(numeric) ? toCelsius(numeric, from) : null;

  return (
    <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
      <h3 className="font-medium">Temperature</h3>
      <div className="mt-3 flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-32 rounded-md border border-black/15 bg-transparent px-2 py-1 text-sm dark:border-white/20"
        />
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value as Unit)}
          className="rounded-md border border-black/15 bg-transparent px-2 py-1 text-sm dark:border-white/20"
        >
          {units.map((u) => (
            <option key={u} value={u}>
              °{u}
            </option>
          ))}
        </select>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
        {units.map((u) => (
          <div key={u} className="rounded-md bg-black/[0.03] p-2 text-center dark:bg-white/[0.06]">
            <dt className="text-xs text-black/50 dark:text-white/50">°{u}</dt>
            <dd className="font-medium">{celsius !== null ? fromCelsius(celsius, u).toFixed(2) : "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
