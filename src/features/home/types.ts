export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"

export type DiaryStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"

export interface HomeData {
  user: {
    nickname: string
  }

  statistics: {
    totalDiaryCount: number
    currentDiaryStreak: number
  }

  calendar: {
    year: number
    month: number
    writtenDates: string[]
    writableFrom: string
    writableTo: string
  }

  today: {
    date: string
    dayOfWeek: DayOfWeek
    diaryStatus: DiaryStatus
    diaryId: number | null
  }

  materials: HomeMaterials
}

export interface HomeMaterials {
  time: {
    period: "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT"
    message: string
  }

  weather: {
    available: boolean
    condition: string
    temperature: number
  }

  calendar: {
    connected: boolean
    useEnabled: boolean
    eventCount: number
    representativeEvent: {
      title: string
      startAt: string
    } | null
  }

  spotify: {
    connected: boolean
    useEnabled: boolean
    recentTrackAvailable: boolean
    trackTitle: string | null
    artistName: string | null
  }
}

export interface DiaryPreviewData {
  diaryId: number
  date: string
  dayOfWeek: DayOfWeek
  keywords: string[]
  firstQuestion: string
  firstAnswer: string
}

export type CalendarDayStatus =
  | "WRITTEN"
  | "TODAY"
  | "WRITABLE"
  | "EXPIRED"
  | "FUTURE"

export interface CalendarDayItem {
  date: string
  day: number
}