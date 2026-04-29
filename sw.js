self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'new post ✦';
  const options = {
    body: data.body || 'something new was written for you.',
    icon: data.icon || '/icon.png',
    badge: '/icon.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'read', title: 'read it →' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'read' || !event.action) {
    event.waitUntil(clients.openWindow(event.notification.data.url || '/'));
  }
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
