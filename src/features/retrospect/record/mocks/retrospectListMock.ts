import type { RetrospectListData } from "@/features/retrospect/record/types"

export const retrospectListMock: RetrospectListData[] = [
  {
    year: 2026,
    month: 7,
    diaries: [
      {
        diaryId: 1,
        date: "2026-07-26",
        dayOfWeek: "SUNDAY",
        keywords: [
          "키워드1",
          "키워드2",
          "키워드3",
        ],
        firstQuestion:
          "Will it rain this afternoon?",
        firstAnswer:
          "Showers expected around 3 PM. Bring an umbrella.",
      },
      {
        diaryId: 2,
        date: "2026-07-25",
        dayOfWeek: "SATURDAY",
        keywords: [
          "날씨",
          "약속",
          "우산",
        ],
        firstQuestion:
          "What did you do after lunch?",
        firstAnswer:
          "I met my friend at a cafe and talked for a long time.",
      },
      {
        diaryId: 3,
        date: "2026-07-21",
        dayOfWeek: "TUESDAY",
        keywords: [
          "학교",
          "공부",
          "과제",
        ],
        firstQuestion:
          "What was the most memorable part of your day?",
        firstAnswer:
          "Finishing my assignment was the most memorable part.",
      },
      {
        diaryId: 4,
        date: "2026-07-19",
        dayOfWeek: "SUNDAY",
        keywords: [
          "키워드1",
          "키워드2",
          "키워드3",
        ],
        firstQuestion:
          "Will it rain this afternoon?",
        firstAnswer:
          "Showers expected around 3 PM. Bring an umbrella.",
      },
    ],
  },
  {
    year: 2026,
    month: 6,
    diaries: [
      {
        diaryId: 4,
        date: "2026-06-28",
        dayOfWeek: "SUNDAY",
        keywords: [
          "산책",
          "공원",
          "휴식",
        ],
        firstQuestion:
          "How did you spend your weekend?",
        firstAnswer:
          "I took a walk in the park and relaxed at home.",
      },
      {
        diaryId: 5,
        date: "2026-06-17",
        dayOfWeek: "WEDNESDAY",
        keywords: [
          "친구",
          "저녁",
          "대화",
        ],
        firstQuestion:
          "Who did you spend time with today?",
        firstAnswer:
          "I had dinner with my friends after class.",
      },
    ],
  },
  {
    year: 2026,
    month: 5,
    diaries: [
      {
        diaryId: 6,
        date: "2026-05-14",
        dayOfWeek: "THURSDAY",
        keywords: [
          "운동",
          "건강",
          "성취",
        ],
        firstQuestion:
          "What made you feel proud today?",
        firstAnswer:
          "I completed my workout even though I was tired.",
      },
    ],
  },
  {
    year: 2025,
    month: 12,
    diaries: [
      {
        diaryId: 7,
        date: "2025-12-24",
        dayOfWeek: "WEDNESDAY",
        keywords: [
          "크리스마스",
          "가족",
          "저녁",
        ],
        firstQuestion:
          "What made today special?",
        firstAnswer:
          "I spent Christmas Eve with my family.",
      },
    ],
  },
  {
    year: 2025,
    month: 7,
    diaries: [
      {
        diaryId: 8,
        date: "2025-07-11",
        dayOfWeek: "FRIDAY",
        keywords: [
          "여행",
          "방학",
          "계획",
        ],
        firstQuestion:
          "What are you looking forward to?",
        firstAnswer:
          "I am looking forward to traveling during summer vacation.",
      },
    ],
  },
]