import sharedRequest from '@/shared/api/request';

export { default as MyPageApiError } from '@/shared/api/ApiError';

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

export type AgreementStatus = 'AGREED' | 'NOT_ANSWERED' | 'DISAGREED';

export interface UserAgreement {
  termId: number;
  termsType: string;
  title: string;
  content: string;
  required: boolean;
  displayOrder: number;
  agreementStatus: AgreementStatus;
  agreedAt: string | null;
}

export interface MyAgreements {
  allRequiredAgreed: boolean;
  agreements: UserAgreement[];
}

function request<T>(path: string, init: RequestInit = {}) {
  return sharedRequest<T>(path, init);
}

export function getMyPageProfile() {
  return request<MyPageProfile>('/users/me');
}

export function getMyAgreements() {
  return request<MyAgreements>('/users/me/agreements');
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

export function deleteAccount() {
  return request<null>('/users/me', {
    method: 'DELETE',
  });
}
