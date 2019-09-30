importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: '562087490693'
  });
  
const messaging = firebase.messaging();

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function (clientList) {
    
    for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == event.notification.data && 'focus' in client)
            return client.focus();
    }
    if (clients.openWindow)
        return clients.openWindow(event.notification.data);
  }));
});

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('Handling background message ', payload);

  return self.registration.showNotification(payload.data.title, {
    body: payload.data.body,
    icon: payload.data.icon,
    tag: payload.data.tag,
    data: payload.data.link
  });
});

