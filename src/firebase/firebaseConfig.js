// src/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Replace the values below with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZRObIv4DFDgkMm-img6gb6XEOuXdtMcI",
  authDomain: "chintamani-a2019.firebaseapp.com",
  projectId: "chintamani-a2019",
  storageBucket: "chintamani-a2019.appspot.com",
  messagingSenderId: "171610965046",
  appId: "1:171610965046:web:someUniqueAppId",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut };
