import { useMutation, useQueryClient } from '@tanstack/react-query';

import { completeDiary, pauseDiary } from '@/features/retrospect/create/api/diaryApi';

export function useCompleteDiaryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      diaryId,
      finalMemo,
    }: {
      diaryId: number;
      finalMemo: string | null;
    }) => completeDiary(diaryId, finalMemo),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['home'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['retrospect-list'],
        }),
      ]);
    },
  });
}

export function usePauseDiaryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (diaryId: number) =>
      pauseDiary(diaryId),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['home'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['retrospect-list'],
        }),
      ]);
    },
  });
}
