"use client";

import { useState } from "react";
import { Plus, Trash2, TestTube, FileSpreadsheet, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { downloadExcel, downloadPdf, type ExportColumn } from "@/lib/export";

interface CalRow {
  id: number;
  analyte: string;
  calPoint: string;
  stdId: string;
  potency: string; // %
  weightMg: string;
  dilutionVol: string;
  volRequired: string;
  finalVol: string;
}

// Seeded with the same 3 analytes / 9 rows as the source "Universal Sample
// Cal Sheet for LC and LCMS" workbook, so the tool opens showing a working,
// familiar example -- editable, and rows can be added for any analyte.
const initialRows: CalRow[] = [
  { id: 1, analyte: "A acetate", calPoint: "LOW 80%", stdId: "S1", potency: "100", weightMg: "26", dilutionVol: "100", volRequired: "0.125", finalVol: "100" },
  { id: 2, analyte: "A acetate", calPoint: "MIDDLE 100%", stdId: "S2", potency: "100", weightMg: "10", dilutionVol: "100", volRequired: "0.125", finalVol: "100" },
  { id: 3, analyte: "A acetate", calPoint: "HIGH 120%", stdId: "S3", potency: "100", weightMg: "23.37", dilutionVol: "50", volRequired: "1.5", finalVol: "20" },
  { id: 4, analyte: "K2", calPoint: "LOW 80%", stdId: "S1", potency: "99.45", weightMg: "10.89", dilutionVol: "100", volRequired: "0.8", finalVol: "20" },
  { id: 5, analyte: "K2", calPoint: "MIDDLE 100%", stdId: "S2", potency: "99.45", weightMg: "15.92", dilutionVol: "100", volRequired: "4", finalVol: "20" },
  { id: 6, analyte: "K2", calPoint: "HIGH 120%", stdId: "S3", potency: "99.45", weightMg: "16.22", dilutionVol: "100", volRequired: "4", finalVol: "10" },
  { id: 7, analyte: "Creatine", calPoint: "LOW 80%", stdId: "S1", potency: "100", weightMg: "98.6", dilutionVol: "50", volRequired: "1", finalVol: "1" },
  { id: 8, analyte: "Creatine", calPoint: "MIDDLE 100%", stdId: "S2", potency: "100", weightMg: "124.7", dilutionVol: "50", volRequired: "1", finalVol: "1" },
  { id: 9, analyte: "Creatine", calPoint: "HIGH 120%", stdId: "S3", potency: "100", weightMg: "148.97", dilutionVol: "50", volRequired: "1", finalVol: "1" },
];

let nextId = initialRows.length + 1;

function computeConc(row: CalRow): number | null {
  const weight = Number(row.weightMg);
  const dilutionVol = Number(row.dilutionVol);
  const volRequired = Number(row.volRequired);
  const potency = Number(row.potency);
  const finalVol = Number(row.finalVol);
  if (![weight, dilutionVol, volRequired, potency, finalVol].every(Number.isFinite)) return null;
  if (dilutionVol === 0 || finalVol === 0) return null;
  // CONC (mg/mL) = WEIGHT / DILUTION * VOL REQUIRED * POTENCY/100 / FINAL VOL
  return (weight / dilutionVol) * volRequired * (potency / 100) / finalVol;
}

function fmt(n: number | null, digits = 6) {
  if (n === null) return "—";
  return Number(n.toPrecision(digits)).toString();
}

const exportColumns: ExportColumn[] = [
  { header: "Analyte", key: "analyte" },
  { header: "Cal point", key: "calPoint" },
  { header: "Std ID", key: "stdId" },
  { header: "Potency (%)", key: "potency" },
  { header: "Weight (mg)", key: "weightMg" },
  { header: "Dilution (vol)", key: "dilutionVol" },
  { header: "Vol required", key: "volRequired" },
  { header: "Final vol", key: "finalVol" },
  { header: "Conc (mg/mL)", key: "conc" },
  { header: "PPM", key: "ppm" },
  { header: "PPB", key: "ppb" },
];

export function CalibrationStandardsCalculator() {
  const [rows, setRows] = useState<CalRow[]>(initialRows);

  function buildExportRows() {
    return rows.map((row) => {
      const conc = computeConc(row);
      const ppm = conc !== null ? conc * 1000 : null;
      const ppb = ppm !== null ? ppm * 1000 : null;
      return {
        analyte: row.analyte,
        calPoint: row.calPoint,
        stdId: row.stdId,
        potency: row.potency,
        weightMg: row.weightMg,
        dilutionVol: row.dilutionVol,
        volRequired: row.volRequired,
        finalVol: row.finalVol,
        conc: fmt(conc),
        ppm: fmt(ppm),
        ppb: fmt(ppb),
      };
    });
  }

  function updateRow(id: number, field: keyof CalRow, value: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      { id: nextId++, analyte: "", calPoint: "", stdId: "", potency: "", weightMg: "", dilutionVol: "", volRequired: "", finalVol: "" },
    ]);
  }

  function removeRow(id: number) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconTile size="sm" gradient="linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)">
            <TestTube size={16} />
          </IconTile>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Calibration Standards (CAL Sheet)</h3>
            <p className="text-xs text-slate-500 dark:text-white/50">
              Conc (mg/mL) = Weight ÷ Dilution Vol × Vol Required × Potency ÷ 100 ÷ Final Vol
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => downloadExcel("Calibration Standards", exportColumns, buildExportRows(), "calibration-standards.xlsx")}
          >
            <FileSpreadsheet size={14} /> Excel
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              downloadPdf("Calibration Standards (CAL Sheet)", exportColumns, buildExportRows(), "calibration-standards.pdf")
            }
          >
            <FileText size={14} /> PDF
          </Button>
          <Button variant="secondary" size="sm" onClick={addRow}>
            <Plus size={14} /> Add row
          </Button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[960px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="text-left text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-white/50">
              <th className="pb-2 pr-2">Analyte</th>
              <th className="pb-2 pr-2">Cal point</th>
              <th className="pb-2 pr-2">Std ID</th>
              <th className="pb-2 pr-2">Potency (%)</th>
              <th className="pb-2 pr-2">Weight (mg)</th>
              <th className="pb-2 pr-2">Dilution (vol)</th>
              <th className="pb-2 pr-2">Vol required</th>
              <th className="pb-2 pr-2">Final vol</th>
              <th className="pb-2 pr-2">Conc (mg/mL)</th>
              <th className="pb-2 pr-2">PPM</th>
              <th className="pb-2 pr-2">PPB</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const conc = computeConc(row);
              const ppm = conc !== null ? conc * 1000 : null;
              const ppb = ppm !== null ? ppm * 1000 : null;
              return (
                <tr key={row.id} className="border-t border-slate-900/[0.06] dark:border-white/10">
                  <td className="py-1.5 pr-2 min-w-[9rem]">
                    <Input value={row.analyte} onChange={(e) => updateRow(row.id, "analyte", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[8rem]">
                    <Input value={row.calPoint} onChange={(e) => updateRow(row.id, "calPoint", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[5rem]">
                    <Input value={row.stdId} onChange={(e) => updateRow(row.id, "stdId", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[6rem]">
                    <Input type="number" value={row.potency} onChange={(e) => updateRow(row.id, "potency", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[6rem]">
                    <Input type="number" value={row.weightMg} onChange={(e) => updateRow(row.id, "weightMg", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[6rem]">
                    <Input type="number" value={row.dilutionVol} onChange={(e) => updateRow(row.id, "dilutionVol", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[6rem]">
                    <Input type="number" value={row.volRequired} onChange={(e) => updateRow(row.id, "volRequired", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[6rem]">
                    <Input type="number" value={row.finalVol} onChange={(e) => updateRow(row.id, "finalVol", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 font-medium text-slate-900 dark:text-white">{fmt(conc)}</td>
                  <td className="py-1.5 pr-2 font-medium text-slate-900 dark:text-white">{fmt(ppm)}</td>
                  <td className="py-1.5 pr-2 font-medium text-slate-900 dark:text-white">{fmt(ppb)}</td>
                  <td className="py-1.5">
                    <button
                      type="button"
                      onClick={() => removeRow(row.id)}
                      aria-label="Remove row"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 dark:text-white/40 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
