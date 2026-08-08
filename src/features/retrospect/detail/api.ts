import sharedRequest from '@/shared/api/request';

import type {
  RetrospectDetailApiResponse,
  RetrospectDetailData,
  UpdateRetrospectMemoResponse,
} from '@/features/retrospect/detail/types';

export async function getRetrospectDetail(
  diaryId: number,
): Promise<RetrospectDetailData> {
  const data =
    await sharedRequest<RetrospectDetailApiResponse>(
      `/diaries/${diaryId}`,
    );

  return {
    diaryId: data.diaryId,
    diaryDate: data.diaryDate,
    dayOfWeek: data.dayOfWeek,
    keywords: data.keywords ?? [],

    qaList: data.qaList.map((qa) => ({
      questionId: qa.questionId,
      questionOrder: qa.questionOrder,
      questionType: qa.questionType,

      questionText:
        qa.questionText ?? '',

      questionKoreanTranslation:
        qa.questionKoreanTranslation ??
        '번역 정보가 없습니다.',

      keyword:
        qa.keyword ?? undefined,

      answer: {
        originalText:
          qa.answer?.originalText ??
          '작성된 답변이 없습니다.',

        correctedText:
          qa.answer?.correctedText ??
          '교정된 답변이 없습니다.',

        correctionReason:
          qa.answer?.correctionReason ??
          '교정 설명이 없습니다.',

        alternativeExpression:
          qa.answer?.alternativeExpression ??
          [],
      },
    })),

    memo: data.memo ?? '',
  };
}

export function updateRetrospectMemo(
  diaryId: number,
  memo: string,
) {
  return sharedRequest<UpdateRetrospectMemoResponse>(
    `/diaries/${diaryId}/memo`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        memo,
      }),
    },
  );
}

export function deleteRetrospect(
  diaryId: number,
) {
  return sharedRequest<null>(
    `/diaries/${diaryId}`,
    {
      method: 'DELETE',
    },
  );
}