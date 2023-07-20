import firebase from "firebase";
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDOS8cUwjl-30_cYZvYcnmbtQoCxslQ2qE",
    authDomain: "test-upsmf.firebaseapp.com",
    projectId: "test-upsmf",
    storageBucket: "test-upsmf.appspot.com",
    messagingSenderId: "641236652787",
    appId: "1:641236652787:web:e428a35978b9d46c841d86"
};

firebase.initializeApp(firebaseConfig);

export default firebase;