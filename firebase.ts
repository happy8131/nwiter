// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALkvupnZvG8KKRzi-d_d4SsqdX4D-Gkx4",
  authDomain: "nwitter-48f6e.firebaseapp.com",
  databaseURL: "https://nwitter-48f6e-default-rtdb.firebaseio.com",
  projectId: "nwitter-48f6e",
  storageBucket: "nwitter-48f6e.appspot.com",
  messagingSenderId: "1097641118978",
  appId: "1:1097641118978:web:a26adef2a9b6e826d5c61b",
  measurementId: "G-4CPREVVNZ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// const analytics = getAnalytics(app);
