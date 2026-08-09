import type { DayOfWeek, RetrospectPreviewData } from '@/shared/types/retrospect';

export interface RetrospectListData {
  year: number;
  month: number;
  diaries: RetrospectPreviewData[];
}

export interface YearMonth {
  year: number;
  month: number;
}

export interface RetrospectListApiResponse {
  year: number;
  month: number;
  diaries: RetrospectListApiDiary[];
}

export interface RetrospectListApiDiary {
  diaryId: number;
  diaryDate: string;
  dayOfWeek: DayOfWeek;
  keywords: string[] | null;
  questionText: string | null;
  correctedText: string | null;
}
