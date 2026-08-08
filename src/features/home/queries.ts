import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  getHome,
  getHomeDate,
  preloadDailyContexts,
  startDiary,
} from '@/features/home/api';

export function useHomeQuery(
  year: number,
  month: number,
) {
  return useQuery({
    queryKey: ['home', year, month],
    queryFn: () => getHome(year, month),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useHomeDateQuery(
  date: string | null,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ['home', 'date', date],
    queryFn: () => getHomeDate(date!),
    enabled: Boolean(date) && enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useDailyContextPreloadMutation(
  year: number,
  month: number,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: preloadDailyContexts,

    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [
          'home',
          year,
          month,
        ],
        type: 'active',
      });
    },
  });
}

export function useStartDiaryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startDiary,

    onSuccess: (diary) => {
      queryClient.invalidateQueries({
        queryKey: [
          'home',
          'date',
          diary.diaryDate,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ['home'],
      });
    },
  });
}