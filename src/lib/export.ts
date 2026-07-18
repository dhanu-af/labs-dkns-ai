export interface ExportColumn {
  header: string;
  key: string;
}

export type ExportRow = Record<string, string | number>;

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Dynamically imported so the ~1MB of Excel/PDF libraries only load once a
// user actually clicks a download button, not on initial page load.
export async function downloadExcel(sheetName: string, columns: ExportColumn[], rows: ExportRow[], filename: string) {
  const ExcelJS = (await import("exceljs")).default;
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(sheetName);
  sheet.columns = columns.map((c) => ({ header: c.header, key: c.key, width: Math.max(c.header.length + 2, 12) }));
  sheet.addRows(rows);
  sheet.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();
  triggerDownload(
    new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
    filename,
  );
}

export async function downloadPdf(title: string, columns: ExportColumn[], rows: ExportRow[], filename: string) {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFontSize(14);
  doc.text(title, 14, 15);
  autoTable(doc, {
    startY: 20,
    head: [columns.map((c) => c.header)],
    body: rows.map((row) => columns.map((c) => String(row[c.key] ?? ""))),
    styles: { fontSize: 7, cellPadding: 2 },
    headStyles: { fillColor: [99, 102, 241] },
  });
  doc.save(filename);
}
