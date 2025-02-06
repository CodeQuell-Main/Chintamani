// src/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Replace the values below with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBduOAu8RydiA0KhnVZabaG29j7m5pyM2U",
  authDomain: "chintamani-41a4b.firebaseapp.com",
  projectId: "chintamani-41a4b",
  storageBucket: "chintamani-41a4b.firebasestorage.app",
  messagingSenderId: "448898026380",
  appId: "1:448898026380:web:65bb61bbed71d8623ba4a9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut };
