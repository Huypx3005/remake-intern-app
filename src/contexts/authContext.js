import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(user));
    });

    // Cleanup function
    return () => unsubscribe();
  }, [auth]);

  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser(userCredential.user);
    localStorage.setItem("user", JSON.stringify(userCredential.user));
  };

  const logOut = async () => {
    await signOut(auth);
    localStorage.clear();
    setUser(null);
  };

  const updateUserProfile = async (description, photoUrl) => {
    await updateProfile(auth.currentUser, {
      displayName: description,
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    });

    // localStorage.setItem("user", JSON.stringify(auth.currentUser));
  };

  const value = {
    user,
    loading,
    signUp,
    logIn,
    logOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
