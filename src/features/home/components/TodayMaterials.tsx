import type { HomeMaterials } from '@/features/home/types';
import { useNavigate } from 'react-router-dom';

import MaterialItem from '@/features/home/components/MaterialItem';
import {
  getWeatherEmoji,
  getWeatherLabel,
} from '@/features/home/utils/weather';

interface TodayMaterialsProps {
  materials: HomeMaterials;
}

export default function TodayMaterials({
  materials,
}: TodayMaterialsProps) {
  const navigate = useNavigate();

  const calendarConnected =
    materials.calendar.connected &&
    materials.calendar.useEnabled;

  const spotifyConnected =
    materials.spotify.connected &&
    materials.spotify.useEnabled;

  const calendarLabel =
    calendarConnected
      ? materials.calendar.eventCount > 0
        ? `오늘 일정 ${materials.calendar.eventCount}개`
        : '오늘 등록된 일정이 없어요'
      : '구글캘린더 연동하기';

  const spotifyLabel =
    spotifyConnected
      ? materials.spotify.recentTrackAvailable &&
        materials.spotify.trackTitle &&
        materials.spotify.artistName
        ? `${materials.spotify.trackTitle} · ${materials.spotify.artistName}`
        : '최근 들은 음악이 없어요'
      : '스포티파이 연동하기';

  const weatherAvailable =
    materials.weather.available &&
    materials.weather.condition !== null &&
    materials.weather.temperature !== null;

  return (
    <section>
      <h2 className="text-headline font-semibold text-black">연동된 오늘의 소재</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        <MaterialItem
          icon="time"
          label={materials.time.message}
          active
        />

        {weatherAvailable && (
          <MaterialItem
            src={getWeatherEmoji(
              materials.weather.condition!,
            )}
            label={`${getWeatherLabel(
              materials.weather.condition!,
            )} ${materials.weather.temperature}도`}
            active
          />
        )}

        <MaterialItem
          icon="music"
          label={spotifyLabel}
          active={spotifyConnected}
          onClick={
            spotifyConnected
              ? undefined
              : () =>
                  navigate(
                    '/mypage/integrations',
                  )
          }
        />

        <MaterialItem
          icon="calendar"
          label={calendarLabel}
          active={calendarConnected}
          onClick={
            calendarConnected
              ? undefined
              : () =>
                  navigate(
                    '/mypage/integrations',
                  )
          }
        />
      </div>
    </section>
  );
}