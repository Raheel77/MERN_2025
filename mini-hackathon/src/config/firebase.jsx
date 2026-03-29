// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwWJ75jcpo72D3ZUC8Z9ZVztXuDIFL944",
  authDomain: "midway-ad07e.firebaseapp.com",
  databaseURL: "https://midway-ad07e-default-rtdb.firebaseio.com",
  projectId: "midway-ad07e",
  storageBucket: "midway-ad07e.firebasestorage.app",
  messagingSenderId: "1086596687342",
  appId: "1:1086596687342:web:5de5f065b04745d7121aff",
  measurementId: "G-1B76M07L0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
``
export let auth = getAuth(app);
export let db = getFirestore(app);
