import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { updateProfile } from '@/features/mypage/api/mypageApi';

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nickname: string) =>
      updateProfile(nickname),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['home'],
      });
    },
  });
}