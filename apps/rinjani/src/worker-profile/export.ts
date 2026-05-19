import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import ExcelJS from "exceljs";

import type { ProfileExportJob, ProfileExportJobSection } from "./types";

const mimeTypes = {
  pdf: "application/pdf",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
} as const;

function startCase(value: string) {
  return value
    .replaceAll(/[_-]+/g, " ")
    .replaceAll(/\./g, " ")
    .replaceAll(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function stringifyValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "-";
  }
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return JSON.stringify(value);
}

function flattenRecordRows(value: unknown, path = ""): Array<{ field: string; value: string }> {
  if (value === null || value === undefined) {
    return path ? [{ field: startCase(path), value: "-" }] : [];
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return path ? [{ field: startCase(path), value: "-" }] : [];
    }

    if (value.every((item) => item === null || ["string", "number", "boolean"].includes(typeof item))) {
      return [{ field: startCase(path), value: value.map((item) => stringifyValue(item)).join(", ") }];
    }

    return value.flatMap((item, index) => flattenRecordRows(item, `${path} ${index + 1}`.trim()));
  }

  if (typeof value === "object") {
    return Object.entries(value).flatMap(([key, nestedValue]) =>
      flattenRecordRows(nestedValue, path ? `${path}.${key}` : key),
    );
  }

  return [{ field: startCase(path), value: stringifyValue(value) }];
}

function sectionRows(section: ProfileExportJobSection) {
  const rows = flattenRecordRows(section.records);
  return rows.map((row) => ({
    Section: section.label,
    Field: row.field,
    Value: row.value,
  }));
}

function buildSummaryRows(job: ProfileExportJob) {
  return [
    {
      Employee: job.employeeName,
      Preset: job.presetId,
      Format: job.format.toUpperCase(),
      Language: job.metadata.language,
      GeneratedAt: job.metadata.generatedAt,
      SectionCount: String(job.sections.length),
    },
  ];
}

function sheetName(label: string) {
  return label.slice(0, 31);
}

async function buildXlsxBytes(job: ProfileExportJob) {
  const workbook = new ExcelJS.Workbook();
  const summarySheet = workbook.addWorksheet("Summary");
  const summaryRows = buildSummaryRows(job);
  summarySheet.columns = Object.keys(summaryRows[0] ?? {}).map((key) => ({ header: key, key, width: 24 }));
  summarySheet.addRows(summaryRows);

  for (const section of job.sections) {
    const worksheet = workbook.addWorksheet(sheetName(section.label));
    const rows = sectionRows(section);
    worksheet.columns = Object.keys(rows[0] ?? { Section: "", Field: "", Value: "" }).map((key) => ({
      header: key,
      key,
      width: key === "Value" ? 48 : 24,
    }));
    worksheet.addRows(rows);
  }

  return new Uint8Array(await workbook.xlsx.writeBuffer());
}

function buildPdfLines(job: ProfileExportJob) {
  const lines = [
    `Worker Profile Export`,
    `Employee ID: ${job.employeeId}`,
    `Preset: ${job.presetId}`,
    `Generated At: ${job.metadata.generatedAt}`,
    "",
  ];

  for (const section of job.sections) {
    lines.push(section.label);
    lines.push(...sectionRows(section).map((row) => `${row.Field}: ${row.Value}`));
    lines.push("");
  }

  return lines;
}

async function buildPdfBytes(job: ProfileExportJob) {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);

  const fontSize = 11;
  const titleSize = 16;
  const pageMargin = 48;
  const lineHeight = 16;
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const maxWidth = pageWidth - pageMargin * 2;
  let page = pdf.addPage([pageWidth, pageHeight]);
  let cursorY = pageHeight - pageMargin;

  const drawLine = (text: string, isTitle = false) => {
    const activeFont = isTitle ? boldFont : font;
    const activeSize = isTitle ? titleSize : fontSize;
    const words = text.split(/\s+/);
    let currentLine = "";

    for (const word of words) {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      if (activeFont.widthOfTextAtSize(candidate, activeSize) > maxWidth && currentLine) {
        if (cursorY < pageMargin) {
          page = pdf.addPage([pageWidth, pageHeight]);
          cursorY = pageHeight - pageMargin;
        }
        page.drawText(currentLine, { x: pageMargin, y: cursorY, size: activeSize, font: activeFont, color: rgb(0.12, 0.14, 0.18) });
        cursorY -= lineHeight;
        currentLine = word;
      } else {
        currentLine = candidate;
      }
    }

    if (cursorY < pageMargin) {
      page = pdf.addPage([pageWidth, pageHeight]);
      cursorY = pageHeight - pageMargin;
    }

    page.drawText(currentLine || " ", { x: pageMargin, y: cursorY, size: activeSize, font: activeFont, color: rgb(0.12, 0.14, 0.18) });
    cursorY -= lineHeight;
  };

  for (const line of buildPdfLines(job)) {
    if (!line) {
      cursorY -= 6;
      continue;
    }
    drawLine(line, line === "Worker Profile Export" || job.sections.some((section) => section.label === line));
  }

  return new Uint8Array(await pdf.save());
}

export async function buildWorkerProfileExportFile(job: ProfileExportJob) {
  const bytes = job.format === "xlsx" ? await buildXlsxBytes(job) : await buildPdfBytes(job);

  return {
    bytes,
    fileName: job.fileName,
    mimeType: mimeTypes[job.format],
  };
}

export async function downloadWorkerProfileExport(job: ProfileExportJob) {
  const file = await buildWorkerProfileExportFile(job);
  const blob = new Blob([file.bytes], { type: file.mimeType });
  const href = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = file.fileName;
  anchor.click();

  URL.revokeObjectURL(href);
  return file;
}
