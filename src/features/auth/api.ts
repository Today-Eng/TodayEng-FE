import { getAccessToken, getRefreshToken } from '@/features/auth/session';

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

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
}

export type EnglishLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface OnboardingRequest {
  nickname: string;
  profileUrl: string | null;
  englishLevel: EnglishLevel;
  interestTagIds: number[];
}

export interface Agreement {
  termId: number;
  agree: boolean;
}

export class ApiError extends Error {
  readonly code?: string;
  readonly status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const accessToken = getAccessToken();
  const headers = new Headers(init.headers);

  headers.set('Content-Type', 'application/json');
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  const body = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (!response.ok || !body?.success) {
    throw new ApiError(
      body?.message ?? '서버 요청에 실패했습니다. 잠시 후 다시 시도해주세요.',
      body?.code,
      response.status,
    );
  }

  return body.data;
}

export function loginWithGoogle(idToken: string) {
  return request<LoginResponse>('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ idToken }),
  });
}

export function logout() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return Promise.resolve();
  }

  return request<null>('/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
}

export function saveAgreements(agreements: Agreement[]) {
  return request<null>('/users/me/agreements', {
    method: 'POST',
    body: JSON.stringify({ agreements }),
  });
}

export function saveOnboarding(onboarding: OnboardingRequest) {
  return request('/users/me/onboarding', {
    method: 'POST',
    body: JSON.stringify(onboarding),
  });
}
