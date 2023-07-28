import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDOS8cUwjl-30_cYZvYcnmbtQoCxslQ2qE",
    authDomain: "test-upsmf.firebaseapp.com",
    projectId: "test-upsmf",
    storageBucket: "test-upsmf.appspot.com",
    messagingSenderId: "641236652787",
    appId: "1:641236652787:web:e428a35978b9d46c841d86"
};

const fireBaseApp = initializeApp(firebaseConfig);
export default fireBaseApp;

const messaging = getMessaging(fireBaseApp);
export const onMessageListener = () => {
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
}

export const getPermissionForToken = () => {
    const permission = 'granted';
    if (permission === "granted") {
      console.log("Notification User Permission Granted."); 
      return getToken(messaging, { vapidKey: `Notification_key_pair` }).then((currentToken) => {
        if (currentToken) {
          console.log('Client Token: ', currentToken);
        } else {
          console.log('Failed to generate the app registration token.');
        }
      })
      .catch((err) => {
        console.log('An error occurred when requesting to receive the token.', err);
      });
    } else {
      console.log("User Permission Denied.");
    }
}