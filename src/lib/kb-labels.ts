import type { KbCategory } from "@prisma/client";

export const KB_CATEGORY_LABEL: Record<KbCategory, string> = {
  EQUIPMENT_TROUBLESHOOTING: "Equipment Troubleshooting",
  METHOD_TROUBLESHOOTING: "Method Troubleshooting",
  CALIBRATION: "Calibration",
  SAMPLE_PREP: "Sample Prep",
  QUALITY_CONTROL: "Quality Control",
  METHOD_DEVELOPMENT: "Method Development",
  GMP_GLP_COMPLIANCE: "GMP / GLP Compliance",
  SAFETY: "Safety",
  DATA_ANALYSIS: "Data Analysis",
  GENERAL: "General",
};

export const KB_CATEGORY_TONE: Record<KbCategory, "neutral" | "info" | "success" | "warning"> = {
  EQUIPMENT_TROUBLESHOOTING: "info",
  METHOD_TROUBLESHOOTING: "info",
  CALIBRATION: "info",
  SAMPLE_PREP: "info",
  QUALITY_CONTROL: "success",
  METHOD_DEVELOPMENT: "info",
  GMP_GLP_COMPLIANCE: "success",
  SAFETY: "warning",
  DATA_ANALYSIS: "info",
  GENERAL: "neutral",
};

export const KB_CATEGORY_ORDER: KbCategory[] = [
  "EQUIPMENT_TROUBLESHOOTING",
  "METHOD_TROUBLESHOOTING",
  "CALIBRATION",
  "SAMPLE_PREP",
  "METHOD_DEVELOPMENT",
  "QUALITY_CONTROL",
  "GMP_GLP_COMPLIANCE",
  "SAFETY",
  "DATA_ANALYSIS",
  "GENERAL",
];
