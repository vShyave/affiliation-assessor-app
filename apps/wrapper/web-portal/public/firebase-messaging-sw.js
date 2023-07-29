importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

//the Firebase config object 
const firebaseConfig = {
    apiKey: "AIzaSyDOS8cUwjl-30_cYZvYcnmbtQoCxslQ2qE",
    authDomain: "test-upsmf.firebaseapp.com",
    projectId: "test-upsmf",
    storageBucket: "test-upsmf.appspot.com",
    messagingSenderId: "641236652787",
    appId: "1:641236652787:web:e428a35978b9d46c841d86"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
}); 