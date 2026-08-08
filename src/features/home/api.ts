import sharedRequest from '@/shared/api/request';

import type {
  HomeData,
  HomeDateData,
  StartDiaryResponse,
} from '@/features/home/types';

interface DailyContextPreloadRequest {
  location?: {
    latitude: number;
    longitude: number;
  };
}

export function getHome(
  year: number,
  month: number,
) {
  return sharedRequest<HomeData>(
    `/home?year=${year}&month=${month}`,
  );
}

export function getHomeDate(date: string) {
  return sharedRequest<HomeDateData>(
    `/home/dates?date=${encodeURIComponent(date)}`,
  );
}

export function preloadDailyContexts(
  body?: DailyContextPreloadRequest,
) {
  return sharedRequest<null>(
    '/daily-contexts/preload',
    {
      method: 'POST',
      body: body
        ? JSON.stringify(body)
        : undefined,
    },
  );
}


export function startDiary(diaryDate: string) {
  return sharedRequest<StartDiaryResponse>('/diaries', {
    method: 'POST',
    body: JSON.stringify({
      diaryDate,
    }),
  });
}

interface ExternalAuthorizationResponse {
  authorizationUrl: string;
}

export function getSpotifyAuthorizationUrl() {
  return sharedRequest<ExternalAuthorizationResponse>(
    '/external-accounts/spotify/authorization',
    {
      method: 'POST',
    },
  );
}

