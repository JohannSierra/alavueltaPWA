// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Inicializa Firebase dentro del SW
firebase.initializeApp({
  apiKey: "AIzaSyCw_58mvh1mqA_JwlcgVXRHf7Dv75eZJMU",
  authDomain: "alavuelta-1c6c1.firebaseapp.com",
  projectId: "alavuelta-1c6c1",
  storageBucket: "alavuelta-1c6c1.appspot.com",
  messagingSenderId: "33525710896",
  appId: "1:33525710896:web:32e062713ff3a57d09edf5",
  measurementId: "G-GMC7JTPCVG"
});

const messaging = firebase.messaging();

// Manejar notificaciones en background
messaging.onBackgroundMessage(function(payload) {

  const notificationTitle = payload.notification?.title || 'Notificación';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/assets/icons/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
