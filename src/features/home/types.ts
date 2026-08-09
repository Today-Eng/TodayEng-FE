import type { DayOfWeek } from '@/shared/types/retrospect';

export type { DayOfWeek, RetrospectPreviewData } from '@/shared/types/retrospect';
export type DiaryStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'DELETED';

export interface HomeData {
  user: {
    nickname: string;
  };

  statistics: {
    totalDiaryCount: number;
    currentDiaryStreak: number;
  };

  calendar: {
    year: number;
    month: number;
    writtenDates: string[];
  };

  today: {
    date: string;
    dayOfWeek: DayOfWeek;
    diaryStatus: DiaryStatus;
    diaryId?: number | null;
  };

  materials: HomeMaterials;
}

export type WeatherCondition =
  'CLEAR' | 'CLOUDY' | 'FOG' | 'RAIN' | 'SNOW' | 'THUNDERSTORM' | 'UNKNOWN';

export interface HomeMaterials {
  time: {
    period: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
    message: string;
  };

  weather: {
    available: boolean;
    condition: WeatherCondition | null;
    temperature: number | null;
  };

  calendar: {
    connected: boolean;
    useEnabled: boolean;
    eventCount: number;
    representativeEvent?: {
      title: string;
      startAt: string;
    } | null;
  };

  spotify: {
    connected: boolean;
    useEnabled: boolean;
    recentTrackAvailable: boolean;
    trackTitle?: string | null;
    artistName?: string | null;
  };
}

export interface HomeDateData {
  diaryId?: number;
  diaryDate: string;
  dayOfWeek: DayOfWeek;
  diaryStatus: DiaryStatus;
  keywords: string[];
  questionText?: string | null;
  correctedText?: string | null;
}

export type CalendarDayStatus = 'WRITTEN' | 'TODAY' | 'WRITABLE' | 'EXPIRED' | 'FUTURE';

export interface CalendarDayItem {
  date: string;
  day: number;
}

export interface StartDiaryResponse {
  diaryId: number;
  diaryDate: string;
  status: 'IN_PROGRESS';
  resumed: boolean;
  createdAt: string;
}
