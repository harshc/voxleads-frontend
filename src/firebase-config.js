// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA_f5a8guyjvYuhG4kHwBz2965w7zUWl1k",
    authDomain: "voxleads-448516.firebaseapp.com",
    projectId: "voxleads-448516",
    storageBucket: "voxleads-448516.firebasestorage.app",
    messagingSenderId: "139895291402",
    appId: "1:139895291402:web:1ae800ce65ad11083fe9f3",
    measurementId: "G-58ZS6TPKGY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
