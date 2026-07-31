import type { RetrospectDetailData } from "../types"

export const retrospectDetailMock: RetrospectDetailData = {
  diaryId: 4521,
  diaryDate: "2026-07-10",
  dayOfWeek: "FRIDAY",
  keywords: [
    "날씨",
    "우산",
    "퇴근",
  ],
  qaList: [
    {
      questionId: 3,
      questionOrder: 1,
      questionType: "MAIN",
      questionText:
        "How did you feel?",
      questionKoreanTranslation:
        "오늘 기분이 어땠나요?",
      keyword: "감정",
      answer: {
        originalText:
          "I was very happy.",
        correctedText:
          "I felt very happy.",
        correctionReason:
          "감정을 표현할 때는 was보다 felt를 사용하는 것이 더 자연스럽습니다.",
        alternativeExpression: [
          "I felt really happy.",
          "I was in a great mood.",
        ],
      },
    },
    {
      questionId: 4,
      questionOrder: 2,
      questionType: "FOLLOW_UP",
      questionText:
        "Why did you feel that way?",
      questionKoreanTranslation:
        "왜 그렇게 느꼈나요?",
      answer: {
        originalText:
          "Because I met my friends.",
        correctedText:
          "Because I met my friends after work.",
        correctionReason:
          "언제 친구를 만났는지 덧붙여 답변을 더 구체적으로 표현했습니다.",
        alternativeExpression: [
          "I felt that way because I spent time with my friends.",
        ],
      },
    },
    {
      questionId: 5,
      questionOrder: 3,
      questionType: "FOLLOW_UP",
      questionText:
        "What did you do together?",
      questionKoreanTranslation:
        "친구들과 무엇을 했나요?",
      answer: {
        originalText:
          "We ate dinner and talked.",
        correctedText:
          "We had dinner and talked for a long time.",
        correctionReason:
          "식사를 했다는 표현은 had dinner가 더 자연스럽고, 대화한 상황을 구체화했습니다.",
        alternativeExpression: [
          "We had dinner together and caught up.",
        ],
      },
    },
  ],
  memo:
    "오늘은 친구들을 만나 기분이 정말 좋았다. 비가 온다는 걸 자연스럽게 표현하는 방식을 익힐 수 있었다.",
}