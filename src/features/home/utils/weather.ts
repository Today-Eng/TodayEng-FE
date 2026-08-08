import clearEmoji from '@/assets/icons/home/sunny.svg';
import cloudyEmoji from '@/assets/icons/home/cloudy.svg';
import fogEmoji from '@/assets/icons/home/fog.svg';
import rainEmoji from '@/assets/icons/home/rain.svg';
import snowEmoji from '@/assets/icons/home/snow.svg';
import thunderstormEmoji from '@/assets/icons/home/thunderstorm.svg';
import unknownEmoji from '@/assets/icons/home/unknown.svg';

import type { WeatherCondition } from '@/features/home/types';

const WEATHER_LABELS: Record<WeatherCondition, string> = {
  CLEAR: '맑음',
  CLOUDY: '흐림',
  FOG: '안개',
  RAIN: '비',
  SNOW: '눈',
  THUNDERSTORM: '뇌우',
  UNKNOWN: '날씨 정보 없음',
};

const WEATHER_EMOJIS: Record<WeatherCondition, string> = {
  CLEAR: clearEmoji,
  CLOUDY: cloudyEmoji,
  FOG: fogEmoji,
  RAIN: rainEmoji,
  SNOW: snowEmoji,
  THUNDERSTORM: thunderstormEmoji,
  UNKNOWN: unknownEmoji,
};

export function getWeatherLabel(
  condition?: WeatherCondition,
) {
  if (!condition) {
    return WEATHER_LABELS.UNKNOWN;
  }

  return WEATHER_LABELS[condition];
}

export function getWeatherEmoji(
  condition?: WeatherCondition,
) {
  if (!condition) {
    return unknownEmoji;
  }

  return WEATHER_EMOJIS[condition];
}