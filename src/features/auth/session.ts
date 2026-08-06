import type { EnglishLevel, LoginResponse } from '@/features/auth/api';

const AUTHENTICATED_KEY = 'todayeng.authenticated';
const ONBOARDING_COMPLETED_KEY = 'todayeng.onboardingCompleted';
const ONBOARDING_DRAFT_KEY = 'todayeng.onboardingDraft';
const ACCESS_TOKEN_KEY = 'todayeng.accessToken';
const REFRESH_TOKEN_KEY = 'todayeng.refreshToken';
const LOGIN_NOTICE_KEY = 'todayeng.loginNotice';

export const SESSION_EXPIRED_MESSAGE = '로그인이 만료되었습니다';

export interface OnboardingDraft {
  nickname?: string;
  englishLevel?: EnglishLevel;
  interestTagIds?: number[];
}

export function isAuthenticated() {
  const authenticated = localStorage.getItem(AUTHENTICATED_KEY);

  if (authenticated !== null) {
    return authenticated === 'true';
  }

  return Boolean(getAccessToken());
}

export function hasCompletedOnboarding() {
  return localStorage.getItem(ONBOARDING_COMPLETED_KEY) === 'true';
}

export function saveSession({ accessToken, refreshToken, isNewUser }: LoginResponse) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(AUTHENTICATED_KEY, 'true');
  localStorage.setItem(ONBOARDING_COMPLETED_KEY, String(!isNewUser));

  if (!isNewUser) {
    sessionStorage.removeItem(ONBOARDING_DRAFT_KEY);
  }
}

export function updateTokens(accessToken: string, refreshToken?: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function completeOnboarding() {
  localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
  sessionStorage.removeItem(ONBOARDING_DRAFT_KEY);
}

export function clearSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(AUTHENTICATED_KEY);
  localStorage.removeItem(ONBOARDING_COMPLETED_KEY);
  sessionStorage.removeItem(ONBOARDING_DRAFT_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function saveSessionExpiredNotice() {
  sessionStorage.setItem(LOGIN_NOTICE_KEY, SESSION_EXPIRED_MESSAGE);
}

export function consumeLoginNotice() {
  const notice = sessionStorage.getItem(LOGIN_NOTICE_KEY);

  if (notice) {
    sessionStorage.removeItem(LOGIN_NOTICE_KEY);
  }

  return notice;
}

export function getOnboardingDraft(): OnboardingDraft {
  const storedDraft = sessionStorage.getItem(ONBOARDING_DRAFT_KEY);

  if (!storedDraft) {
    return {};
  }

  try {
    return JSON.parse(storedDraft) as OnboardingDraft;
  } catch {
    sessionStorage.removeItem(ONBOARDING_DRAFT_KEY);
    return {};
  }
}

export function updateOnboardingDraft(update: Partial<OnboardingDraft>) {
  sessionStorage.setItem(
    ONBOARDING_DRAFT_KEY,
    JSON.stringify({ ...getOnboardingDraft(), ...update }),
  );
}
