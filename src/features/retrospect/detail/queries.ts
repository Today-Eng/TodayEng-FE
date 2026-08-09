import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteRetrospect, getRetrospectDetail, updateRetrospectMemo } from '@/features/retrospect/detail/api';

export function useRetrospectDetailQuery(
  diaryId: number,
) {
  return useQuery({
    queryKey: [
      'retrospect-detail',
      diaryId,
    ],
    queryFn: () =>
      getRetrospectDetail(diaryId),
    enabled: Number.isFinite(diaryId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useUpdateRetrospectMemoMutation(
  diaryId: number,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memo: string) =>
      updateRetrospectMemo(
        diaryId,
        memo,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'retrospect-detail',
          diaryId,
        ],
      });
    },
  });
}

export function useDeleteRetrospectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRetrospect,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['retrospect-list'],
        refetchType: 'none',
      });

      await queryClient.invalidateQueries({
        queryKey: ['home'],
        refetchType: 'none',
      });
    },
  });
}