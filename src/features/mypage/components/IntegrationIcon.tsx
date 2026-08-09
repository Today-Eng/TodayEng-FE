import googleCalendarIcon from '@/features/mypage/assets/google-calendar.svg';
import spotifyBaseIcon from '@/features/mypage/assets/spotify-base.svg';
import spotifyMarkIcon from '@/features/mypage/assets/spotify-mark.svg';
import type { IntegrationProvider } from '@/features/mypage/types';

interface IntegrationIconProps {
  provider: IntegrationProvider;
}

export default function IntegrationIcon({ provider }: IntegrationIconProps) {
  if (provider === 'googleCalendar') {
    return (
      <img
        src={googleCalendarIcon}
        alt=""
        aria-hidden="true"
        className="h-[18px] w-[18px] shrink-0"
      />
    );
  }

  return (
    <span className="relative h-[18px] w-[18px] shrink-0 overflow-hidden">
      <img src={spotifyBaseIcon} alt="" aria-hidden="true" className="h-full w-full" />
      <img
        src={spotifyMarkIcon}
        alt=""
        aria-hidden="true"
        className="absolute left-[15.43%] top-[26.07%] h-[47.5%] w-[71.21%]"
      />
    </span>
  );
}
