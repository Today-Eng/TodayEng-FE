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
import type { HomeMaterials } from './types';

export function useHomeQuery(
  year: number,
  month: number,
) {
  return useQuery({
    queryKey: ['home', year, month],
    queryFn: () => getHome(year, month),
    staleTime: 0,
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
    staleTime: 0,
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
      const updatedHome = await queryClient.fetchQuery({
        queryKey: ['home', year, month],
        queryFn: () => getHome(year, month),
        staleTime: 0,
      });

      queryClient.setQueryData(
        ['home-materials'],
        updatedHome.materials,
      );
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

export function useHomeMaterialsQuery() {
  return useQuery<HomeMaterials>({
    queryKey: ['home-materials'],
    queryFn: async () => {
      throw new Error('home-materials는 직접 fetch하지 않습니다.');
    },
    enabled: false,
  });
}