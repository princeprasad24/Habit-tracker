// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe-TKi1nLH4wqp5saHOGR954sWO-2Ynq4",
  authDomain: "habit-tracker-667a7.firebaseapp.com",
  databaseURL: "https://habit-tracker-667a7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "habit-tracker-667a7",
  storageBucket: "habit-tracker-667a7.firebasestorage.app",
  messagingSenderId: "408418670182",
  appId: "1:408418670182:web:6772fbcd47a54df9b2ffa7",
  measurementId: "G-GW8C0MDNZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const database = getDatabase(app);

export {app , auth, database};