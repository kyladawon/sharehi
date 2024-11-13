// src/firebase.js

// Import the Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCumykHMFJ6TbxRhMLACiZdfHbvPdVt2Zk",
  authDomain: "sharehi-99c1b.firebaseapp.com",
  projectId: "sharehi-99c1b",
  storageBucket: "sharehi-99c1b.appspot.com",
  messagingSenderId: "1087649213799",
  appId: "1:1087649213799:web:c149f941a2adc41e8993c2",
  measurementId: "G-BVYK5S15B0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

