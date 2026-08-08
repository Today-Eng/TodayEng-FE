import { getAccessToken } from '@/features/auth/session';
import ApiError from '@/shared/api/ApiError';
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

function authHeaders(): HeadersInit {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function startDiary(diaryDate: string) {
  return request<DiaryStartResponse>('/diaries', {
    method: 'POST',
    body: JSON.stringify({ diaryDate }),
  });
}

export async function createDiaryContext(
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

  const response = await fetch(`${BASE_URL}/diaries/${diaryId}/contexts`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
    signal: AbortSignal.timeout(30_000),
  });

  const body = await response.json() as { success: boolean; code?: string; message: string; data: DiaryContextResponse };
  if (!response.ok || !body.success) throw new ApiError(body.message, body.code, response.status);
  return body.data;
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

export async function uploadAnswer(diaryId: number, questionId: number, blob: Blob) {
  const formData = new FormData();
  formData.append('audio', blob, 'answer.webm');

  const response = await fetch(
    `${BASE_URL}/diaries/${diaryId}/questions/${questionId}/answers`,
    {
      method: 'POST',
      headers: authHeaders(),
      body: formData,
      signal: AbortSignal.timeout(30_000),
    },
  );

  const body = await response.json() as { success: boolean; code?: string; message: string; data: AnswerUploadResponse };
  if (!response.ok || !body.success) throw new ApiError(body.message, body.code, response.status);
  return body.data;
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
