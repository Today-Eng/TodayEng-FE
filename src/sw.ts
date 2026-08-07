/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

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

  event.waitUntil(self.clients.openWindow(url));
});