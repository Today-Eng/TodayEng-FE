import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getNotificationSetting,
  updateNotificationSetting,
  type NotificationSetting,
} from '@/features/notification/api';
import { enablePushNotification } from '@/features/notification/push';

export const notificationKeys = {
  all: ['notification'] as const,
  setting: () => [...notificationKeys.all, 'setting'] as const,
};

export function useNotificationSetting() {
  return useQuery({
    queryKey: notificationKeys.setting(),
    queryFn: getNotificationSetting,
    staleTime: 1000 * 60 * 5,
  });
}

export function useToggleNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (enabled: boolean) => {
      if (enabled) {
        await enablePushNotification();
        return updateNotificationSetting(true);
      }

      return updateNotificationSetting(false);
    },

    onSuccess: (data) => {
      queryClient.setQueryData<NotificationSetting>(
        notificationKeys.setting(),
        data,
      );
    },
  });
}