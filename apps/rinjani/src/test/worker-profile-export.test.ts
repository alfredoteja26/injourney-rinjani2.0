// @vitest-environment node

import ExcelJS from "exceljs";
import { PDFDocument } from "pdf-lib";

import { buildWorkerProfile, buildProfileExportJob } from "../worker-profile/model";
import { buildWorkerProfileExportFile } from "../worker-profile/export";

describe("Worker profile export generation", () => {
  test("creates a readable xlsx workbook from the filtered export payload", async () => {
    const profile = buildWorkerProfile({
      employeeId: "EMP-20002",
      viewerRole: "employee",
      accessContext: "self",
    });
    const job = buildProfileExportJob({
      profile,
      format: "xlsx",
      presetId: "talent-profile-summary",
      includeSectionIds: ["core", "talent", "performance"],
      includeSensitiveFields: false,
      language: "id",
    });

    const file = await buildWorkerProfileExportFile(job);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.bytes);

    expect(file.mimeType).toBe("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    expect(workbook.worksheets.map((sheet) => sheet.name)).toEqual(["Summary", "Core CV", "Talent Insights", "Performance Insights"]);

    const summarySheet = workbook.getWorksheet("Summary");
    expect(summarySheet?.getRow(2).getCell(1).value).toBe(profile.core.fullName);
    expect(summarySheet?.getRow(2).getCell(2).value).toBe("talent-profile-summary");
  });

  test("creates a readable pdf document from the filtered export payload", async () => {
    const profile = buildWorkerProfile({
      employeeId: "EMP-0001",
      viewerRole: "talent_committee",
      accessContext: "committee",
    });
    const job = buildProfileExportJob({
      profile,
      format: "pdf",
      presetId: "admin-review-pack",
      includeSectionIds: ["core", "talent", "performance", "governance"],
      includeSensitiveFields: true,
      language: "id",
    });

    const file = await buildWorkerProfileExportFile(job);
    const pdf = await PDFDocument.load(file.bytes);

    expect(file.mimeType).toBe("application/pdf");
    expect(pdf.getPageCount()).toBeGreaterThan(0);
    expect(file.fileName.endsWith(".pdf")).toBe(true);
  });
});
