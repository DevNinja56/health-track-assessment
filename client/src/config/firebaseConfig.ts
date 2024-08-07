import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration from .env file
const apiKey = import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env
  .VITE_PUBLIC_FIREBASE_MESSING_SENDER_ID;
const appId = import.meta.env.VITE_PUBLIC_FIREBASE_APP_ID;
const measurementId = import.meta.env.VITE_PUBLIC_FIREBASE_MEASUREMENT_ID;

// Firebase configuration object
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const db = firestore;

export { auth, firestore, storage, app, db };
