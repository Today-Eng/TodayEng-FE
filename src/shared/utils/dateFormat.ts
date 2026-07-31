export const KOREAN_DAY_OF_WEEK = {
  MONDAY: "월요일",
  TUESDAY: "화요일",
  WEDNESDAY: "수요일",
  THURSDAY: "목요일",
  FRIDAY: "금요일",
  SATURDAY: "토요일",
  SUNDAY: "일요일",
} as const

export function getKoreanDayOfWeek(
  dayOfWeek: keyof typeof KOREAN_DAY_OF_WEEK,
) {
  return KOREAN_DAY_OF_WEEK[dayOfWeek]
}

export function formatDiaryDate(date: string) {
  const [, month, day] = date.split("-").map(Number)

  return `${month}월 ${day}일`
}