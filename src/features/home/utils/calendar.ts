import type {
  CalendarDayItem,
  CalendarDayStatus,
  DayOfWeek,
} from '@/features/home/types';

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

// 기준: 오늘 포함 최근 7일 = 오늘 ~ 오늘 - 6일
const WRITABLE_DAY_COUNT = 7;

export function formatDate(
  year: number,
  month: number,
  day: number,
): string {
  return [
    year,
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join('-');
}

export function createCalendarDays(
  year: number,
  month: number,
): Array<CalendarDayItem | null> {
  const firstDayIndex = new Date(
    year,
    month - 1,
    1,
  ).getDay();

  const lastDate = new Date(
    year,
    month,
    0,
  ).getDate();

  const days: Array<CalendarDayItem | null> = [];

  for (
    let index = 0;
    index < firstDayIndex;
    index += 1
  ) {
    days.push(null);
  }

  for (
    let day = 1;
    day <= lastDate;
    day += 1
  ) {
    days.push({
      date: formatDate(year, month, day),
      day,
    });
  }

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return days;
}

export function getDifferenceInDays(
  firstDate: string,
  secondDate: string,
): number {
  const [firstYear, firstMonth, firstDay] =
    firstDate.split('-').map(Number);

  const [secondYear, secondMonth, secondDay] =
    secondDate.split('-').map(Number);

  const firstUtc = Date.UTC(
    firstYear,
    firstMonth - 1,
    firstDay,
  );

  const secondUtc = Date.UTC(
    secondYear,
    secondMonth - 1,
    secondDay,
  );

  return Math.floor(
    (secondUtc - firstUtc) /
      DAY_IN_MILLISECONDS,
  );
}

export function getCalendarDayStatus(params: {
  date: string;
  today: string;
  writtenDates: string[];
}): CalendarDayStatus {
  const {
    date,
    today,
    writtenDates,
  } = params;

  if (date > today) {
    return 'FUTURE';
  }

  if (writtenDates.includes(date)) {
    return 'WRITTEN';
  }

  // 오늘
  if (date === today) {
    return 'TODAY';
  }

  const differenceInDays =
    getDifferenceInDays(date, today);

  if (
    differenceInDays >= 0 &&
    differenceInDays < WRITABLE_DAY_COUNT
  ) {
    return 'WRITABLE';
  }

  return 'EXPIRED';
}

/**
 * 날짜를 클릭했을 때
 * GET /home/dates API를 호출해야 하는지 판단.
 *
 * 1. 미래 → 호출 X
 * 2. 최근 7일 → 실제 Diary 상태 확인을 위해 호출
 * 3. 7일 이전이어도 writtenDates에 있으면
 *    완료 회고 조회를 위해 호출
 * 4. 7일 이전 + writtenDates 없음 → 호출 X
 */
export function shouldFetchDateDetail(params: {
  date: string;
  today: string;
  writtenDates: string[];
}): boolean {
  const {
    date,
    today,
    writtenDates,
  } = params;

  if (date > today) {
    return false;
  }

  if (writtenDates.includes(date)) {
    return true;
  }

  const differenceInDays =
    getDifferenceInDays(date, today);

  return (
    differenceInDays >= 0 &&
    differenceInDays < WRITABLE_DAY_COUNT
  );
}

export function getPreviousMonth(
  year: number,
  month: number,
) {
  if (month === 1) {
    return {
      year: year - 1,
      month: 12,
    };
  }

  return {
    year,
    month: month - 1,
  };
}

export function getNextMonth(
  year: number,
  month: number,
) {
  if (month === 12) {
    return {
      year: year + 1,
      month: 1,
    };
  }

  return {
    year,
    month: month + 1,
  };
}

export function getKoreanDayOfWeek(
  dayOfWeek: DayOfWeek,
): string {
  const labels: Record<DayOfWeek, string> = {
    MONDAY: '월요일',
    TUESDAY: '화요일',
    WEDNESDAY: '수요일',
    THURSDAY: '목요일',
    FRIDAY: '금요일',
    SATURDAY: '토요일',
    SUNDAY: '일요일',
  };

  return labels[dayOfWeek];
}

export function getDayOfWeekFromDate(
  date: string,
): DayOfWeek {
  const day = new Date(
    `${date}T00:00:00`,
  ).getDay();

  const dayOfWeeks: DayOfWeek[] = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ];

  return dayOfWeeks[day];
}

export function formatSelectedDate(
  date: string,
): string {
  const [, month, day] = date.split('-');

  return `${Number(month)}월 ${Number(day)}일`;
}