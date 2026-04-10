import type { KpiDictionaryItem, KpiItem } from "./types";

export function newPortfolioKpiId(prefix = "KPI-U"): string {
  return `${prefix}-${Date.now()}`;
}

export function kpiItemFromDictionary(d: KpiDictionaryItem, employeeNumber: string, year: number, id: string): KpiItem {
  const progressive = d.monitoringPeriod === "QUARTERLY" || d.monitoringPeriod === "SEMESTER";
  return {
    id,
    code: d.code,
    title: d.title,
    description: d.description,
    kpiType: d.kpiType,
    polarity: d.polarity,
    targetType: progressive ? "PROGRESSIVE" : "FIXED",
    targetUnit: d.targetUnit,
    monitoringPeriod: d.monitoringPeriod,
    capType: d.capType,
    customCapValue: d.customCapValue,
    bscPerspective: d.bscPerspective,
    formula: d.formula,
    source: "LIBRARY",
    dictionaryItemId: d.id,
    year,
    itemApprovalStatus: "ALLOCATED",
    ownerEmployeeNumber: employeeNumber,
  };
}
