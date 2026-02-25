// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1b1JUC9sayxrzg8pYxXuhQhrW_7TJFyA",
  authDomain: "auth-5247a.firebaseapp.com",
  projectId: "auth-5247a",
  storageBucket: "auth-5247a.firebasestorage.app",
  messagingSenderId: "827923824302",
  appId: "1:827923824302:web:e8fdbac61477c60727b73f",
  measurementId: "G-T2MVCHL3M5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export let auth = getAuth(app);
export let db = getFirestore(app);
