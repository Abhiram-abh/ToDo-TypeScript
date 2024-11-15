// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // For Realtime Database
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyC7RlOYK8a-8bOzNWK8FVPErFE87bIBQuA",
  authDomain: "todo-3b1c7.firebaseapp.com",
  projectId: "todo-3b1c7",
  storageBucket: "todo-3b1c7.appspot.com",
  messagingSenderId: "108163471667",
  appId: "1:108163471667:web:b80f73b3bde4f64b20c646",
  measurementId: "G-RCW492EFGD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const firestore = getFirestore(app); // Initialize Firestore

export { app, firestore }; // Only export app and database for Realtime Database
