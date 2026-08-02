import type {
  CalendarDayItem,
  CalendarDayStatus,
  DayOfWeek,
} from "@/features/home/types"

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24

export function formatDate(
  year: number,
  month: number,
  day: number,
): string {
  return [
    year,
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("-")
}

export function createCalendarDays(
  year: number,
  month: number,
): Array<CalendarDayItem | null> {
  const firstDayIndex = new Date(year, month - 1, 1).getDay()
  const lastDate = new Date(year, month, 0).getDate()

  const days: Array<CalendarDayItem | null> = []

  for (let index = 0; index < firstDayIndex; index += 1) {
    days.push(null)
  }

  for (let day = 1; day <= lastDate; day += 1) {
    days.push({
      date: formatDate(year, month, day),
      day,
    })
  }

  while (days.length % 7 !== 0) {
    days.push(null)
  }

  return days
}

export function getCalendarDayStatus(params: {
  date: string
  today: string
  writtenDates: string[]
  writableFrom: string
  writableTo: string
}): CalendarDayStatus {
  const {
    date,
    today,
    writtenDates,
    writableFrom,
    writableTo,
  } = params

  if (writtenDates.includes(date)) {
    return "WRITTEN"
  }

  if (date > today) {
    return "FUTURE"
  }

  if (date === today) {
    return "TODAY"
  }

  if (date >= writableFrom && date <= writableTo) {
    return "WRITABLE"
  }

  return "EXPIRED"
}

export function getPreviousMonth(year: number, month: number) {
  if (month === 1) {
    return {
      year: year - 1,
      month: 12,
    }
  }

  return {
    year,
    month: month - 1,
  }
}

export function getNextMonth(year: number, month: number) {
  if (month === 12) {
    return {
      year: year + 1,
      month: 1,
    }
  }

  return {
    year,
    month: month + 1,
  }
}

export function getKoreanDayOfWeek(dayOfWeek: DayOfWeek): string {
  const labels: Record<DayOfWeek, string> = {
    MONDAY: "월요일",
    TUESDAY: "화요일",
    WEDNESDAY: "수요일",
    THURSDAY: "목요일",
    FRIDAY: "금요일",
    SATURDAY: "토요일",
    SUNDAY: "일요일",
  }

  return labels[dayOfWeek]
}

export function getDayOfWeekFromDate(date: string): DayOfWeek {
  const day = new Date(`${date}T00:00:00`).getDay()

  const dayOfWeeks: DayOfWeek[] = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ]

  return dayOfWeeks[day]
}

export function formatSelectedDate(date: string): string {
  const [, month, day] = date.split("-")

  return `${Number(month)}월 ${Number(day)}일`
}

export function getDifferenceInDays(
  firstDate: string,
  secondDate: string,
): number {
  const first = new Date(`${firstDate}T00:00:00`)
  const second = new Date(`${secondDate}T00:00:00`)

  return Math.floor(
    (second.getTime() - first.getTime()) / DAY_IN_MILLISECONDS,
  )
}