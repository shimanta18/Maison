import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your exact credentials from your configuration screenshot
const firebaseConfig = {
  apiKey: "AIzaSyDc8aFFBInERv_EpmG2MTpa30X0p2s91Vw",
  authDomain: "maison-market.firebaseapp.com",
  projectId: "maison-market",
  storageBucket: "maison-market.firebasestorage.app",
  messagingSenderId: "559302634786",
  appId: "1:559302634786:web:446a6ce8a394fe847d897b"
};

// Prevent initializing multiple instances during Next.js hot-reloads
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
