import { MetricType } from "@/types/enums"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function convertTitleCase(text: string) {
  return text.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())
}

export const evaluationMetricNames = [
  "Recall",
  "Precision",
  "NDCG",
  "HitRatio",
  "MAP",
  "Personalization",
  "Coverage",
  "MRR",
]

export const summaryMetricNames = [
  "Rank time",
  "Test users count",
  "Test items count",
  "Test interactions count",
  "Test sparsity",
  "Train users count",
  "Train items count",
  "Train interactions count",
  "Train sparsity",
  "Rank time live P99",
]

export function getMetricNames(metricType: MetricType): string[] {
  switch (metricType) {
    case MetricType.EVALUATION_METRIC:
      return evaluationMetricNames
    case MetricType.SUMMARY_METRIC:
      return summaryMetricNames
    default:
      return []
  }
}

export const slateSizes = ["10", "50"]
