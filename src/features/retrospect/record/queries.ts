import { useQuery } from '@tanstack/react-query';

import { getRetrospectList } from '@/features/retrospect/record/api';

export function useRetrospectListQuery(
  year: number,
  month: number,
) {
  return useQuery({
    queryKey: [
      'retrospect-list',
      year,
      month,
    ],
    queryFn: () =>
      getRetrospectList(year, month),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}