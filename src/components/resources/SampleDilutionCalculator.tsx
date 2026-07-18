"use client";

import { useState } from "react";
import { Plus, Trash2, FlaskConical, FileSpreadsheet, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/IconTile";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { downloadExcel, downloadPdf, type ExportColumn } from "@/lib/export";

interface SampleRow {
  id: number;
  jobNumber: string;
  sampleDetails: string;
  specification: string;
  lowerValue: string;
  upperValue: string;
  atw: string;
  sampleWtGms: string;
  initialDilution: string;
  requiredVol: string;
  finalVol: string;
}

// Seeded with the meaningful example rows from the source "Universal Sample
// Cal Sheet for LC and LCMS" job-sheet table (the rows with real inputs --
// the workbook also had several template rows left blank, which we skip).
const initialRows: SampleRow[] = [
  { id: 1, jobNumber: "55978", sampleDetails: "", specification: "0.1935-0.35475/650.00mg", lowerValue: "0.1935", upperValue: "0.35475", atw: "650", sampleWtGms: "1", initialDilution: "50", requiredVol: "1", finalVol: "1" },
  { id: 2, jobNumber: "56044", sampleDetails: "", specification: "65.421-116.7mcg/972.00mg", lowerValue: "0.065", upperValue: "0.1167", atw: "972", sampleWtGms: "1", initialDilution: "25", requiredVol: "1", finalVol: "1" },
  { id: 3, jobNumber: "56190", sampleDetails: "ID", specification: "950", lowerValue: "950", upperValue: "950", atw: "1000", sampleWtGms: "0.01", initialDilution: "100", requiredVol: "1", finalVol: "1" },
  { id: 4, jobNumber: "56167", sampleDetails: "", specification: "NLT 2%", lowerValue: "20", upperValue: "20", atw: "1000", sampleWtGms: "0.5", initialDilution: "50", requiredVol: "1", finalVol: "1" },
  { id: 5, jobNumber: "", sampleDetails: "", specification: "", lowerValue: "67", upperValue: "67", atw: "1000", sampleWtGms: "0.25", initialDilution: "50", requiredVol: "1", finalVol: "1" },
];

let nextId = initialRows.length + 1;

interface Computed {
  dilutionFactor: number | null;
  lowerConc: number | null;
  upperConc: number | null;
}

function compute(row: SampleRow): Computed {
  const initialDilution = Number(row.initialDilution);
  const requiredVol = Number(row.requiredVol);
  const finalVol = Number(row.finalVol);
  const lowerValue = Number(row.lowerValue);
  const upperValue = Number(row.upperValue);
  const atw = Number(row.atw);
  const sampleWt = Number(row.sampleWtGms);

  const dilutionFactor =
    Number.isFinite(initialDilution) && Number.isFinite(requiredVol) && Number.isFinite(finalVol) && requiredVol !== 0
      ? (finalVol / requiredVol) * initialDilution
      : null;

  const validBase =
    dilutionFactor !== null &&
    dilutionFactor !== 0 &&
    Number.isFinite(atw) &&
    atw !== 0 &&
    Number.isFinite(sampleWt);

  // Conc (mg/mL) = Value * Sample Wt(gms) * 1000 / (ATW * Dilution Factor)
  const lowerConc = validBase && Number.isFinite(lowerValue) ? (lowerValue * sampleWt * 1000) / (atw * dilutionFactor!) : null;
  const upperConc = validBase && Number.isFinite(upperValue) ? (upperValue * sampleWt * 1000) / (atw * dilutionFactor!) : null;

  return { dilutionFactor, lowerConc, upperConc };
}

function fmt(n: number | null, digits = 6) {
  if (n === null) return "—";
  return Number(n.toPrecision(digits)).toString();
}

const exportColumns: ExportColumn[] = [
  { header: "Job #", key: "jobNumber" },
  { header: "Sample details", key: "sampleDetails" },
  { header: "Specification", key: "specification" },
  { header: "Lower value", key: "lowerValue" },
  { header: "Upper value", key: "upperValue" },
  { header: "ATW", key: "atw" },
  { header: "Sample wt (g)", key: "sampleWtGms" },
  { header: "Initial dilution", key: "initialDilution" },
  { header: "Required vol", key: "requiredVol" },
  { header: "Final vol", key: "finalVol" },
  { header: "Dilution factor", key: "dilutionFactor" },
  { header: "Lower conc (mg/mL)", key: "lowerConc" },
  { header: "Upper conc (mg/mL)", key: "upperConc" },
  { header: "Lower PPM", key: "lowerPpm" },
  { header: "Upper PPM", key: "upperPpm" },
  { header: "Lower PPB", key: "lowerPpb" },
  { header: "Upper PPB", key: "upperPpb" },
];

export function SampleDilutionCalculator() {
  const [rows, setRows] = useState<SampleRow[]>(initialRows);

  function buildExportRows() {
    return rows.map((row) => {
      const { dilutionFactor, lowerConc, upperConc } = compute(row);
      const lowerPpm = lowerConc !== null ? lowerConc * 1000 : null;
      const upperPpm = upperConc !== null ? upperConc * 1000 : null;
      const lowerPpb = lowerPpm !== null ? lowerPpm * 1000 : null;
      const upperPpb = upperPpm !== null ? upperPpm * 1000 : null;
      return {
        jobNumber: row.jobNumber,
        sampleDetails: row.sampleDetails,
        specification: row.specification,
        lowerValue: row.lowerValue,
        upperValue: row.upperValue,
        atw: row.atw,
        sampleWtGms: row.sampleWtGms,
        initialDilution: row.initialDilution,
        requiredVol: row.requiredVol,
        finalVol: row.finalVol,
        dilutionFactor: fmt(dilutionFactor),
        lowerConc: fmt(lowerConc),
        upperConc: fmt(upperConc),
        lowerPpm: fmt(lowerPpm),
        upperPpm: fmt(upperPpm),
        lowerPpb: fmt(lowerPpb),
        upperPpb: fmt(upperPpb),
      };
    });
  }

  function updateRow(id: number, field: keyof SampleRow, value: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      {
        id: nextId++,
        jobNumber: "",
        sampleDetails: "",
        specification: "",
        lowerValue: "",
        upperValue: "",
        atw: "",
        sampleWtGms: "",
        initialDilution: "",
        requiredVol: "",
        finalVol: "",
      },
    ]);
  }

  function removeRow(id: number) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconTile size="sm" gradient="linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)">
            <FlaskConical size={16} />
          </IconTile>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Sample Dilution & Specification</h3>
            <p className="text-xs text-slate-500 dark:text-white/50">
              Dilution factor = Final Vol ÷ Required Vol × Initial Dilution · Conc (mg/mL) = Value × Sample Wt × 1000 ÷ (ATW × Dilution Factor)
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => downloadExcel("Sample Dilution", exportColumns, buildExportRows(), "sample-dilution.xlsx")}
          >
            <FileSpreadsheet size={14} /> Excel
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => downloadPdf("Sample Dilution & Specification", exportColumns, buildExportRows(), "sample-dilution.pdf")}
          >
            <FileText size={14} /> PDF
          </Button>
          <Button variant="secondary" size="sm" onClick={addRow}>
            <Plus size={14} /> Add row
          </Button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[1400px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="text-left text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-white/50">
              <th className="pb-2 pr-2">Job #</th>
              <th className="pb-2 pr-2">Sample details</th>
              <th className="pb-2 pr-2">Specification</th>
              <th className="pb-2 pr-2">Lower value</th>
              <th className="pb-2 pr-2">Upper value</th>
              <th className="pb-2 pr-2">ATW</th>
              <th className="pb-2 pr-2">Sample wt (g)</th>
              <th className="pb-2 pr-2">Initial dilution</th>
              <th className="pb-2 pr-2">Required vol</th>
              <th className="pb-2 pr-2">Final vol</th>
              <th className="pb-2 pr-2">Dilution factor</th>
              <th className="pb-2 pr-2">Lower conc (mg/mL)</th>
              <th className="pb-2 pr-2">Upper conc (mg/mL)</th>
              <th className="pb-2 pr-2">Lower PPM</th>
              <th className="pb-2 pr-2">Upper PPM</th>
              <th className="pb-2 pr-2">Lower PPB</th>
              <th className="pb-2 pr-2">Upper PPB</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const { dilutionFactor, lowerConc, upperConc } = compute(row);
              const lowerPpm = lowerConc !== null ? lowerConc * 1000 : null;
              const upperPpm = upperConc !== null ? upperConc * 1000 : null;
              const lowerPpb = lowerPpm !== null ? lowerPpm * 1000 : null;
              const upperPpb = upperPpm !== null ? upperPpm * 1000 : null;
              return (
                <tr key={row.id} className="border-t border-slate-900/[0.06] dark:border-white/10">
                  <td className="py-1.5 pr-2 min-w-[6rem]">
                    <Input value={row.jobNumber} onChange={(e) => updateRow(row.id, "jobNumber", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[8rem]">
                    <Input value={row.sampleDetails} onChange={(e) => updateRow(row.id, "sampleDetails", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[10rem]">
                    <Input value={row.specification} onChange={(e) => updateRow(row.id, "specification", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[6rem]">
                    <Input type="number" value={row.lowerValue} onChange={(e) => updateRow(row.id, "lowerValue", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[6rem]">
                    <Input type="number" value={row.upperValue} onChange={(e) => updateRow(row.id, "upperValue", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[6rem]">
                    <Input type="number" value={row.atw} onChange={(e) => updateRow(row.id, "atw", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[6rem]">
                    <Input type="number" value={row.sampleWtGms} onChange={(e) => updateRow(row.id, "sampleWtGms", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[6rem]">
                    <Input type="number" value={row.initialDilution} onChange={(e) => updateRow(row.id, "initialDilution", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[6rem]">
                    <Input type="number" value={row.requiredVol} onChange={(e) => updateRow(row.id, "requiredVol", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 min-w-[6rem]">
                    <Input type="number" value={row.finalVol} onChange={(e) => updateRow(row.id, "finalVol", e.target.value)} />
                  </td>
                  <td className="py-1.5 pr-2 font-medium text-slate-900 dark:text-white">{fmt(dilutionFactor)}</td>
                  <td className="py-1.5 pr-2 font-medium text-slate-900 dark:text-white">{fmt(lowerConc)}</td>
                  <td className="py-1.5 pr-2 font-medium text-slate-900 dark:text-white">{fmt(upperConc)}</td>
                  <td className="py-1.5 pr-2 font-medium text-slate-900 dark:text-white">{fmt(lowerPpm)}</td>
                  <td className="py-1.5 pr-2 font-medium text-slate-900 dark:text-white">{fmt(upperPpm)}</td>
                  <td className="py-1.5 pr-2 font-medium text-slate-900 dark:text-white">{fmt(lowerPpb)}</td>
                  <td className="py-1.5 pr-2 font-medium text-slate-900 dark:text-white">{fmt(upperPpb)}</td>
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
