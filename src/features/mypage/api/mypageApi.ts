const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080').replace(
  /\/$/,
  '',
);

interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

export type EnglishLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface Interest {
  interestTagId: number;
  tagName: string;
}

export interface MyPageProfile {
  userId: number;
  nickname: string;
  profileUrl: string | null;
  englishLevel: EnglishLevel;
  totalDiaryCount: number;
  currentStreak: number;
  email: string;
  interests: Interest[];
}

export class MyPageApiError extends Error {
  readonly code?: string;
  readonly status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.name = 'MyPageApiError';
    this.code = code;
    this.status = status;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);

  headers.set('Content-Type', 'application/json');

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    credentials: 'include',
  });
  const body = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (!response.ok || !body?.success) {
    throw new MyPageApiError(
      body?.message ?? '서버 요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
      body?.code,
      response.status,
    );
  }

  return body.data;
}

export function getMyPageProfile() {
  return request<MyPageProfile>('/users/me');
}

export function updateProfile(nickname: string) {
  return request<{ nickname: string }>('/users/me/profile', {
    method: 'PATCH',
    body: JSON.stringify({ nickname }),
  });
}

export function updateEnglishLevel(englishLevel: EnglishLevel) {
  return request<{ englishLevel: EnglishLevel }>('/users/me/eng-level', {
    method: 'PATCH',
    body: JSON.stringify({ englishLevel }),
  });
}

export function updateInterests(interestTagIds: number[]) {
  return request<{ interests: Interest[] }>('/users/me/interests', {
    method: 'PUT',
    body: JSON.stringify({ interestTagIds }),
  });
}
