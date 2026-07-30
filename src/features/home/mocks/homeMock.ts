import type {
  DiaryPreviewData,
  HomeData,
} from "../types"

export const homeMock: HomeData = {
  user: {
    nickname: "홍길동",
  },

  statistics: {
    totalDiaryCount: 120,
    currentDiaryStreak: 0,
  },

  calendar: {
    year: 2026,
    month: 7,
    writtenDates: [
      "2026-07-01",
      "2026-07-19",
      "2026-07-20",
      "2026-07-21",
      "2026-07-26",
    ],
    writableFrom: "2026-07-19",
    writableTo: "2026-07-26",
  },

  today: {
    date: "2026-07-26",
    dayOfWeek: "SUNDAY",
    diaryStatus: "COMPLETED",
    diaryId: 26,
  },

  materials: {
    time: {
      period: "EVENING",
      message: "저녁입니다",
    },

    weather: {
      available: true,
      condition: "맑음",
      temperature: 26,
    },

    calendar: {
      connected: true,
      useEnabled: true,
      eventCount: 1,
      representativeEvent: {
        title: "친구 5명 약속",
        startAt: "2026-07-26T19:00:00",
      },
    },

    spotify: {
      connected: false,
      useEnabled: false,
      recentTrackAvailable: false,
      trackTitle: null,
      artistName: null,
    },
  },
}

export const diaryPreviewMock: Record<string, DiaryPreviewData> = {
  "2026-07-26": {
    diaryId: 26,
    date: "2026-07-26",
    dayOfWeek: "SUNDAY",
    keywords: ["키워드1", "키워드2", "키워드3"],
    firstQuestion: "Showers are expected around 3 PM. Bring an umbrella. Will it rain this afternoon?",
    firstAnswer:
      "Showers are expected around 3 PM. Bring an umbrella.",
  },

  "2026-07-21": {
    diaryId: 21,
    date: "2026-07-21",
    dayOfWeek: "TUESDAY",
    keywords: ["날씨", "친구", "약속"],
    firstQuestion: "What was the best part of your day?",
    firstAnswer: "Meeting my friends after a long time.",
  },

  "2026-07-20": {
    diaryId: 20,
    date: "2026-07-20",
    dayOfWeek: "MONDAY",
    keywords: ["공부", "영어"],
    firstQuestion: "What did you learn today?",
    firstAnswer: "I learned some new English expressions.",
  },
}