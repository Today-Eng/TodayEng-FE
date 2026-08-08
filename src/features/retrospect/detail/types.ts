import type { DayOfWeek } from '@/shared/types/retrospect';

export type QuestionType =
  | 'MAIN'
  | 'FOLLOW_UP';

export type RetrospectViewMode =
  | 'CORRECTED'
  | 'ORIGINAL';

export interface RetrospectAnswer {
  originalText: string;
  correctedText: string;
  correctionReason: string;
  alternativeExpression: string[];
}

export interface RetrospectQuestionAnswer {
  questionId: number;
  questionOrder: number;
  questionType: QuestionType;
  questionText: string;
  questionKoreanTranslation: string;
  keyword?: string;
  answer: RetrospectAnswer;
}

export interface RetrospectDetailData {
  diaryId: number;
  diaryDate: string;
  dayOfWeek: DayOfWeek;
  keywords: string[];
  qaList: RetrospectQuestionAnswer[];
  memo: string;
}

export interface RetrospectDetailApiResponse {
  diaryId: number;
  diaryDate: string;
  dayOfWeek: DayOfWeek;
  keywords: string[] | null;
  qaList: RetrospectQuestionAnswerApi[];
  memo: string | null;
}

export interface RetrospectQuestionAnswerApi {
  questionId: number;
  questionOrder: number;
  questionType: QuestionType;
  questionText: string | null;
  questionKoreanTranslation: string | null;
  keyword: string | null;
  answer: RetrospectAnswerApi | null;
}

export interface RetrospectAnswerApi {
  originalText: string | null;
  correctedText: string | null;
  correctionReason: string | null;
  alternativeExpression: string[] | null;
}

export interface UpdateRetrospectMemoRequest {
  memo: string | null;
}

export interface UpdateRetrospectMemoResponse {
  diaryId: number;
  memo: string | null;
}