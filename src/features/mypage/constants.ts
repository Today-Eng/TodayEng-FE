import type { IntegrationProvider } from '@/features/mypage/types';

export const INTEGRATION_TERM_ID = {
  spotify: 6,
  googleCalendar: 5,
} satisfies Record<IntegrationProvider, number>;

export const INTEGRATION_PROVIDER_LABEL = {
  spotify: '스포티파이',
  googleCalendar: '구글캘린더',
} satisfies Record<IntegrationProvider, string>;

export const INTEGRATION_PROVIDER_NAME = {
  spotify: 'Spotify',
  googleCalendar: 'Google Calendar',
} satisfies Record<IntegrationProvider, string>;
