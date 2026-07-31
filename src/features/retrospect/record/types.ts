import type { RetrospectPreviewData } from "@/shared/types/retrospect"

export interface RetrospectListData {
  year: number
  month: number
  diaries: RetrospectPreviewData[]
}

export interface YearMonth {
  year: number
  month: number
}