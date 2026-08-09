import request from '@/shared/api/request';
import type {
  AnswerDetail,
  AnswerUploadResponse,
  AnswersResponse,
  CurrentQuestionResponse,
  DiaryCompleteResponse,
  DiaryContextResponse,
  DiaryStartResponse,
  QuestionsResponse,
  ReflectionSessionResponse,
} from '@/features/retrospect/create/types';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080').replace(/\/$/, '');

export function startDiary(diaryDate: string) {
  return request<DiaryStartResponse>('/diaries', {
    method: 'POST',
    body: JSON.stringify({ diaryDate }),
  });
}

export function createDiaryContext(
  diaryId: number,
  params: {
    memo?: string;
    images?: File[];
    latitude?: number;
    longitude?: number;
  },
) {
  const formData = new FormData();
  formData.append('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);

  if (params.memo) formData.append('memo', params.memo);
  if (params.latitude != null) formData.append('latitude', String(params.latitude));
  if (params.longitude != null) formData.append('longitude', String(params.longitude));
  params.images?.forEach((file) => formData.append('images', file));

  return request<DiaryContextResponse>(`/diaries/${diaryId}/contexts`, {
    method: 'POST',
    body: formData,
    signal: AbortSignal.timeout(30_000),
  });
}

export function startReflectionSession(diaryId: number) {
  return request<ReflectionSessionResponse>(`/diaries/${diaryId}/reflection-sessions`, {
    method: 'POST',
  });
}

export function getQuestions(diaryId: number) {
  return request<QuestionsResponse>(`/diaries/${diaryId}/questions`);
}

export function getCurrentQuestion(diaryId: number) {
  return request<CurrentQuestionResponse>(`/diaries/${diaryId}/questions/next`);
}

export function uploadAnswer(diaryId: number, questionId: number, blob: Blob) {
  const formData = new FormData();
  formData.append('audio', blob, 'answer.webm');

  return request<AnswerUploadResponse>(`/diaries/${diaryId}/questions/${questionId}/answers`, {
    method: 'POST',
    body: formData,
    signal: AbortSignal.timeout(30_000),
  });
}

export function getAnswer(diaryId: number, answerId: number) {
  return request<AnswerDetail>(`/diaries/${diaryId}/answers/${answerId}`);
}

export function getAnswers(diaryId: number) {
  return request<AnswersResponse>(`/diaries/${diaryId}/answers`);
}

export function completeDiary(diaryId: number, finalMemo: string | null) {
  return request<DiaryCompleteResponse>(`/diaries/${diaryId}/complete`, {
    method: 'PATCH',
    body: JSON.stringify({ finalMemo }),
  });
}

export function pauseDiary(diaryId: number) {
  return request<null>(`/diaries/${diaryId}/pause`, {
    method: 'PATCH',
  });
}

export function toAbsoluteAudioUrl(url: string) {
  if (url.startsWith('http')) return url;
  return `${BASE_URL}${url}`;
}
