import sharedRequest from '@/shared/api/request';

export interface NotificationSetting {
  isEnabled: boolean;
  hasPushSubscription: boolean;
}

export interface PushSubscriptionRequest {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export function getNotificationSetting() {
  return sharedRequest<NotificationSetting>('/users/me/notification', {
    method: 'GET',
  });
}

export function updateNotificationSetting(isEnabled: boolean) {
  return sharedRequest<NotificationSetting>('/users/me/notification', {
    method: 'PATCH',
    body: JSON.stringify({ isEnabled }),
  });
}


export function savePushSubscription(subscription: PushSubscriptionRequest) {
  return sharedRequest<NotificationSetting>('/users/me/push-subscription', {
    method: 'PUT',
    body: JSON.stringify(subscription),
  });
}


export function deletePushSubscription() {
  return sharedRequest<NotificationSetting>('/users/me/push-subscription', {
    method: 'DELETE',
  });
}