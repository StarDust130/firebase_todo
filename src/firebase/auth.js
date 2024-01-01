"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth } from "./firebase";

//! Create the context 🎨
const AuthContext = createContext({
  authUser: null,
  loading: true,
});

//! Create the context provider value 🎁
export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  //! Listen for Firebase state change
  const authStateChanged = async (user) => {
    setIsLoading(true);
    if (!user) {
      clear();
      return;
    }
    setAuthUser({
      uid: user.uid,
      email: user.email,
      username: user.displayName,
    });
    setIsLoading(false);
  };

  //! Handle user sign out
  const signOut = async () => {
    await authSignOut(auth).then(() => {
      clear();
      return;
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);

    return () => unsubscribe();
  }, []);

  return {
    authUser,
    isLoading,
    setAuthUser,
    signOut,
  };
}

//! Create the provider 🦘
export const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
