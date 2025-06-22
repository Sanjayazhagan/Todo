// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6zd0VJhfwcxoaxI7VZ_nqn_N7Plzjes4",
  authDomain: "https://todo-nine-blush-17.vercel.app/",
  projectId: "todo-9c123",
  storageBucket: "todo-9c123.firebasestorage.app",
  messagingSenderId: "805586140828",
  appId: "1:805586140828:web:047b863c99aaa16f89f759",
  measurementId: "G-ST7FRJYFBQ"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

if (typeof window !== "undefined") {
  (window as any).auth = auth;
}

export { app, auth };