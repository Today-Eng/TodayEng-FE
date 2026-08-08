import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { getHome } from '@/features/home/api';

import {
  useDailyContextPreloadMutation,
  useHomeDateQuery,
  useHomeQuery,
  useStartDiaryMutation,
} from '@/features/home/queries';

import {
  getCalendarDayStatus,
  getNextMonth,
  getPreviousMonth,
  shouldFetchDateDetail,
} from '@/features/home/utils/calendar';

import type { CalendarDayStatus } from '@/features/home/types';

export default function useHome() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const now = new Date();

  const [currentYear, setCurrentYear] = useState(now.getFullYear());

  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);

  const [userSelectedDate, setUserSelectedDate] = useState<string | null>(null);

  const {
    data: home,
    isLoading: isHomeLoading,
    isError: isHomeError,
  } = useHomeQuery(currentYear, currentMonth);

  const selectedDate = useMemo(() => {
    if (!home) {
      return null;
    }

    if (userSelectedDate) {
      return userSelectedDate;
    }

    const [todayYear, todayMonth] = home.today.date.split('-').map(Number);

    const isCurrentMonth = currentYear === todayYear && currentMonth === todayMonth;

    return isCurrentMonth ? home.today.date : null;
  }, [home, userSelectedDate, currentYear, currentMonth]);

  const { mutate: preloadDailyContexts } = useDailyContextPreloadMutation(
    currentYear,
    currentMonth,
  );

  useEffect(() => {
    if (!home) {
      return;
    }

    const previous = getPreviousMonth(currentYear, currentMonth);

    void queryClient.prefetchQuery({
      queryKey: ['home', previous.year, previous.month],
      queryFn: () => getHome(previous.year, previous.month),
      staleTime: 5 * 60 * 1000,
    });
  }, [home, currentYear, currentMonth, queryClient]);

  useEffect(() => {
    const today = home?.today.date;

    if (!today) {
      return;
    }

    const preloadDateKey = 'todayeng.dailyContextPreloadedDate';

    const preloadedDate = sessionStorage.getItem(preloadDateKey);

    if (preloadedDate === today) {
      return;
    }

    const preload = (location?: { latitude: number; longitude: number }) => {
      preloadDailyContexts(location ? { location } : undefined, {
        onSuccess: () => {
          sessionStorage.setItem(preloadDateKey, today);
        },
      });
    };

    if (!navigator.geolocation) {
      preload();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        preload({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        preload();
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 10 * 60 * 1000,
      },
    );
  }, [home?.today.date, preloadDailyContexts, queryClient]);

  const shouldFetchSelectedDate = useMemo(() => {
    if (!home || !selectedDate) {
      return false;
    }

    return shouldFetchDateDetail({
      date: selectedDate,
      today: home.today.date,
      writtenDates: home.calendar.writtenDates,
    });
  }, [home, selectedDate]);

  const {
    data: selectedDiary,
    isLoading: isDateLoading,
    isError: isDateError,
  } = useHomeDateQuery(selectedDate, shouldFetchSelectedDate);

  const getDateStatus = (date: string): CalendarDayStatus => {
    if (!home) {
      return 'FUTURE';
    }

    return getCalendarDayStatus({
      date,
      today: home.today.date,
      writtenDates: home.calendar.writtenDates,
    });
  };

  const handlePreviousMonth = () => {
    const previous = getPreviousMonth(currentYear, currentMonth);

    setCurrentYear(previous.year);
    setCurrentMonth(previous.month);
    setUserSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (!home) {
      return;
    }

    const next = getNextMonth(currentYear, currentMonth);

    const nextCalendarValue = next.year * 12 + next.month;

    const [todayYear, todayMonth] = home.today.date.split('-').map(Number);

    const todayCalendarValue = todayYear * 12 + todayMonth;

    if (nextCalendarValue > todayCalendarValue) {
      return;
    }

    setCurrentYear(next.year);
    setCurrentMonth(next.month);
    setUserSelectedDate(null);
  };

  const handleDateSelect = (date: string) => {
    const status = getDateStatus(date);

    if (status === 'FUTURE') {
      return;
    }

    setUserSelectedDate(date);
  };
  const { mutateAsync: startDiary } = useStartDiaryMutation();

  const handleRetrospect = async () => {
    if (!selectedDate || !selectedDiary) {
      return;
    }

    if (
      selectedDiary.diaryStatus !== 'NOT_STARTED' &&
      selectedDiary.diaryStatus !== 'IN_PROGRESS'
    ) {
      return;
    }

    try {
      const { diaryId, resumed } = await startDiary(selectedDate);

      navigate(resumed ? `/retrospect-loading/${diaryId}` : `/retrospect/${diaryId}`);
    } catch {
      // 회고 시작 실패 시 현재 화면 유지
    }
  };

  const handleRetrospectDetail = (diaryId: number) => {
    navigate(`/retrospects/${diaryId}`);
  };

  const isSelectedDateExpired =
    Boolean(selectedDate) && !shouldFetchSelectedDate && getDateStatus(selectedDate!) === 'EXPIRED';

  return {
    home,

    currentYear,
    currentMonth,

    selectedDate,
    selectedDiary,

    isSelectedDateExpired,

    isHomeLoading,
    isHomeError,

    isDateLoading,
    isDateError,

    getDateStatus,

    handlePreviousMonth,
    handleNextMonth,
    handleDateSelect,
    handleRetrospect,
    handleRetrospectDetail,
  };
}
