export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"

export interface DiaryPreviewData {
  diaryId: number
  date: string
  dayOfWeek: DayOfWeek
  keywords: string[]
  firstQuestion: string
  firstAnswer: string
}