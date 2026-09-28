// ═══════════════════════════════════════════════
// CunkPay — Firebase Messaging Service Worker
// firebase-messaging-sw.js (place in repo root)
// ═══════════════════════════════════════════════

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDAbScL9p3caIH9zpW3m9f8D3cWLetfOrs",
  authDomain: "cunkpay.firebaseapp.com",
  projectId: "cunkpay",
  storageBucket: "cunkpay.firebasestorage.app",
  messagingSenderId: "789585022129",
  appId: "1:789585022129:web:935f8bef2232a43503e690"
});

const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage(function(payload) {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || "CunkPay", {
    body: body || "You have a new notification.",
    icon: icon || "/cunkpay.png",
    badge: "/cunkpay.png",
    data: payload.data || {}
  });
});

// On notification click — open or focus the app
self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url.includes("cunkpay.com.ng") && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("https://cunkpay.com.ng/worker.html");
      }
    })
  );
});
