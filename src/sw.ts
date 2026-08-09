/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url, request }) =>
    /^\/(api|diaries)(\/|$)/.test(url.pathname) &&
    request.headers.get('Accept') !== 'text/event-stream',
  new NetworkOnly(),
);

self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  const data = event.data.json() as {
    title: string;
    body: string;
    url: string;
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/pwa-192x192.png',
      data: {
        url: data.url,
      },
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url ?? '/';

  event.waitUntil(
    self.clients.openWindow(url),
  );
});