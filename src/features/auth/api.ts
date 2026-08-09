import { getRefreshToken } from '@/features/auth/session';
import sharedRequest from '@/shared/api/request';

export { default as ApiError } from '@/shared/api/ApiError';

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

function request<T>(path: string, init: RequestInit = {}) {
  return sharedRequest<T>(path, init);
}

export function loginWithGoogle(idToken: string) {
  return sharedRequest<LoginResponse>(
    '/auth/google',
    {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    },
    { auth: false },
  );
}

export function logout() {
  const refreshToken = getRefreshToken();

  return sharedRequest<null>(
    '/auth/logout',
    {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    },
    { retryOnUnauthorized: false },
  );
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
