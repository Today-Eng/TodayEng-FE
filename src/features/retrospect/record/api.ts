import sharedRequest from '@/shared/api/request';

import type {
  RetrospectListApiResponse,
  RetrospectListData,
} from '@/features/retrospect/record/types';

export async function getRetrospectList(
  year: number,
  month: number,
): Promise<RetrospectListData> {
  const data =
    await sharedRequest<RetrospectListApiResponse>(
      `/diaries?year=${year}&month=${month}`,
    );

  return {
    year: data.year,
    month: data.month,
    diaries: data.diaries.map((diary) => ({
      diaryId: diary.diaryId,
      date: diary.diaryDate,
      dayOfWeek: diary.dayOfWeek,
      keywords: diary.keywords ?? [],
      firstQuestion:
        diary.questionText ??
        '질문이 없습니다.',
      firstAnswer:
        diary.correctedText ??
        '작성된 답변이 없습니다.',
    })),
  };
}