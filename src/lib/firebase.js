import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

/**
 * Firebase web configuration.
 *
 * These values come from the Firebase console:
 * Project settings -> General -> Your apps -> SDK setup and configuration.
 * Every value is safe to expose in the browser, but they still belong in
 * `.env.local` so each environment can point at its own Firebase project.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const requiredKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "appId",
];

export const isFirebaseConfigured = requiredKeys.every(
  (key) => typeof firebaseConfig[key] === "string" && firebaseConfig[key].length > 0,
);

export const FIREBASE_NOT_CONFIGURED_MESSAGE =
  "Firebase is not configured yet. Add your Firebase web app keys to .env.local and restart the dev server.";

let cachedAuth = null;
let cachedGoogleProvider = null;

function createFirebaseAuth() {
  if (!isFirebaseConfigured) return null;

  // Firebase authentication relies on browser APIs, so skip it during SSR.
  if (typeof window === "undefined") return null;

  if (!cachedAuth) {
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    cachedAuth = getAuth(app);
    cachedGoogleProvider = new GoogleAuthProvider();
    cachedGoogleProvider.setCustomParameters({ prompt: "select_account" });
  }

  return cachedAuth;
}

/**
 * Returns the shared Firebase Auth instance, or null when the environment is
 * missing configuration or we are rendering on the server.
 */
export function getFirebaseAuth() {
  return createFirebaseAuth();
}

export function getGoogleAuthProvider() {
  createFirebaseAuth();
  return cachedGoogleProvider;
}
