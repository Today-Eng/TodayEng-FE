import {
  getNotificationSetting,
  savePushSubscription,
  type PushSubscriptionRequest,
} from '@/features/notification/api';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export async function enablePushNotification() {
  if (!('Notification' in window)) {
    throw new Error('이 브라우저에서는 알림을 지원하지 않습니다.');
  }

  if (!('serviceWorker' in navigator)) {
    throw new Error('이 브라우저에서는 Service Worker를 지원하지 않습니다.');
  }

  let permission = Notification.permission;

  if (permission === 'default') {
    permission = await requestNotificationPermission();
  }

  if (permission === 'denied') {
    throw new Error('알림 권한이 차단되어 있습니다.');
  }

  let subscription = await getCurrentPushSubscription();

  if (!subscription) {
    subscription = await createPushSubscription();
  }

  const request = toPushSubscriptionRequest(subscription);

  await savePushSubscription(request);
}

export function getNotificationPermission() {
  return Notification.permission;
}

export function requestNotificationPermission() {
  return Notification.requestPermission();
}

export async function getCurrentPushSubscription() {
  const registration = await navigator.serviceWorker.ready;

  return registration.pushManager.getSubscription();
}

export async function createPushSubscription() {
  const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

  if (!vapidPublicKey) {
    throw new Error('VAPID 공개키가 설정되지 않았습니다.');
  }

  const registration = await navigator.serviceWorker.ready;

  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
  });
}

export function toPushSubscriptionRequest(
  subscription: PushSubscription,
): PushSubscriptionRequest {
  const json = subscription.toJSON();

  const p256dh = json.keys?.p256dh;
  const auth = json.keys?.auth;

  if (!json.endpoint || !p256dh || !auth) {
    throw new Error('푸시 구독 정보가 올바르지 않습니다.');
  }

  return {
    endpoint: json.endpoint,
    keys: {
      p256dh,
      auth,
    },
  };
}

export async function restorePushSubscriptionIfNeeded() {
  if (!('Notification' in window) || !('serviceWorker' in navigator)) {
    return;
  }

  const setting = await getNotificationSetting();

  if (
    !setting.isEnabled ||
    setting.hasPushSubscription ||
    Notification.permission !== 'granted'
  ) {
    return;
  }

  let subscription = await getCurrentPushSubscription();

  if (!subscription) {
    subscription = await createPushSubscription();
  }

  await savePushSubscription(
    toPushSubscriptionRequest(subscription),
  );
}