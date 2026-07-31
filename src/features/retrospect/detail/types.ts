import type { DayOfWeek } from "@/shared/types/retrospect"

export type QuestionType =
  | "MAIN"
  | "FOLLOW_UP"

export type RetrospectViewMode =
  | "CORRECTED"
  | "ORIGINAL"

export interface RetrospectAnswer {
  originalText: string
  correctedText: string
  correctionReason: string
  alternativeExpression: string[]
}

export interface RetrospectQuestionAnswer {
  questionId: number
  questionOrder: number
  questionType: QuestionType
  questionText: string
  questionKoreanTranslation: string
  keyword?: string
  answer: RetrospectAnswer
}

export interface RetrospectDetailData {
  diaryId: number
  diaryDate: string
  dayOfWeek: DayOfWeek
  keywords: string[]
  qaList: RetrospectQuestionAnswer[]
  memo: string
}