// custom-sw.js - VERSIÓN CORREGIDA
console.log('🔄 [Custom SW] Iniciando Service Worker combinado...');

// 1. Firebase Messaging
try {
  importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');
  
  console.log('✅ [Custom SW] Firebase scripts cargados');
  
  // Inicializar Firebase
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
    console.log('[Custom SW] Mensaje de Firebase recibido', payload);
    
    const notificationTitle = payload.notification?.title || 'A La Vuelta';
    const notificationOptions = {
      body: payload.notification?.body || '',
      icon: '/assets/icons/icon-192x192.png',
      badge: '/assets/icons/icon-72x72.png',
      data: payload.data || {},
      tag: 'alv-notification'
    };
    
    return self.registration.showNotification(notificationTitle, notificationOptions);
  });
  
  console.log('✅ [Custom SW] Firebase configurado correctamente');
} catch (firebaseError) {
  console.warn('⚠️ [Custom SW] Error cargando Firebase:', firebaseError);
}

// 2. Angular PWA Service Worker
try {
  importScripts('./ngsw-worker.js');
  console.log('✅ [Custom SW] Angular Service Worker importado');
} catch (angularError) {
  console.error('❌ [Custom SW] Error cargando Angular SW:', angularError);
}

// 3. Eventos de instalación para PWA
self.addEventListener('install', (event) => {
  console.log('🔧 [Custom SW] Instalando...');
  // Saltar espera para activación inmediata
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('🚀 [Custom SW] Activando...');
  // Tomar control inmediato de todos los clients
  event.waitUntil(self.clients.claim());
});

// 4. Evento de fetch (opcional, para logging)
self.addEventListener('fetch', (event) => {
  // El Angular SW manejará el fetch
  // Solo agregamos logging para debug
  if (event.request.url.includes('/api/') || event.request.url.includes('/auth/')) {
    console.log(`🌐 [Custom SW] Fetch: ${event.request.url}`);
  }
});

console.log('✅✅✅ [Custom SW] CARGADO COMPLETAMENTE ✅✅✅');