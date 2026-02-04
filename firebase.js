// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-storage.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAB263ElAc0VNcMC5nB4w9FZW7qDHf76RY",
  authDomain: "expense-tracking-ea7de.firebaseapp.com",
  projectId: "expense-tracking-ea7de",
  storageBucket: "expense-tracking-ea7de.appspot.com",
  messagingSenderId: "566671004347",
  appId: "1:566671004347:web:e9dd0ed4205a0ffadb0f9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
