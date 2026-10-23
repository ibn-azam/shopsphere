"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  FIREBASE_NOT_CONFIGURED_MESSAGE,
  getFirebaseAuth,
  getGoogleAuthProvider,
  isFirebaseConfigured,
} from "@/lib/firebase";

const AuthContext = createContext(null);

const AUTH_ERROR_MESSAGES = {
  "auth/email-already-in-use":
    "An account with this email already exists. Try signing in instead.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/invalid-email": "That email address doesn't look right.",
  "auth/missing-password": "Please enter your password.",
  "auth/operation-not-allowed":
    "This sign-in method is disabled in your Firebase project. Enable it under Authentication > Sign-in method.",
  "auth/popup-blocked":
    "Your browser blocked the Google sign-in popup. Trying redirect instead...",
  "auth/popup-closed-by-user":
    "The Google sign-in window closed before finishing. Please try again.",
  "auth/cancelled-popup-request": "Another sign-in attempt is already in progress.",
  "auth/too-many-requests":
    "Too many attempts. Please wait a moment and try again.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No account found with that email. Create one first.",
  "auth/weak-password": "Choose a password with at least 6 characters.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/network-request-failed":
    "Network error. Check your connection and try again.",
  "auth/unauthorized-domain":
    "This domain isn't authorized in Firebase. Add it under Authentication > Settings > Authorized domains.",
};

export function getAuthErrorMessage(error) {
  if (!error) return "Something went wrong. Please try again.";

  if (typeof error === "string") return error;

  return (
    AUTH_ERROR_MESSAGES[error.code] ??
    error.message ??
    "Something went wrong. Please try again."
  );
}

function requireAuth() {
  const auth = getFirebaseAuth();

  if (!auth) {
    throw new Error(FIREBASE_NOT_CONFIGURED_MESSAGE);
  }

  return auth;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getFirebaseAuth();

    if (!auth) return undefined;

    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
        }
      })
      .catch((authError) => {
        setError(getAuthErrorMessage(authError));
      });

    const unsubscribe = onAuthStateChanged(
      auth,
      (nextUser) => {
        setUser(nextUser);
        setLoading(false);
      },
      (authError) => {
        setError(getAuthErrorMessage(authError));
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const login = useCallback(async (email, password) => {
    const auth = requireAuth();
    setError("");
    const credential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password,
    );
    return credential.user;
  }, []);

  const signup = useCallback(async ({ name, email, password }) => {
    const auth = requireAuth();
    setError("");
    const credential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password,
    );

    const displayName = name.trim();
    if (displayName) {
      await updateProfile(credential.user, { displayName });
    }

    return credential.user;
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const auth = requireAuth();
    setError("");

    try {
      const credential = await signInWithPopup(auth, getGoogleAuthProvider());
      return credential.user;
    } catch (err) {
      if (
        err?.code === "auth/popup-blocked" ||
        err?.code === "auth/popup-closed-by-user" ||
        err?.code === "auth/cancelled-popup-request" ||
        err?.code === "auth/operation-not-supported-in-this-environment"
      ) {
        await signInWithRedirect(auth, getGoogleAuthProvider());
        return null;
      }
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    const auth = getFirebaseAuth();

    if (!auth) {
      setError(FIREBASE_NOT_CONFIGURED_MESSAGE);
      return;
    }

    setError("");
    await signOut(auth);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      isConfigured: isFirebaseConfigured,
      login,
      signup,
      loginWithGoogle,
      logout,
    }),
    [user, loading, error, login, signup, loginWithGoogle, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
