import React, { useContext, useState, useEffect } from "react";

/*FIREBASE*/
import { auth } from "../firebase";

/* CREATING CONTEXT */
const AuthContext = React.createContext();

/* CREATING AND EXPORTING CUSTOM HOOK */
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
    /* RETURNS A PROMISE */
  }

  /* LOGIN */
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  /* LOGOUT */
  function logout() {
    return auth.signOut();
  }

  /* PASSWORD RESET */
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  /* EMAIL UPDATE */
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  /* PASSWORD UPDATE */
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  /* createUserWithEmailAndPassword() automatically calls setCurrentUser */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    /* onAuthStateChanged() returns a function which upon called unsubscribes the onAuthStateChanged event */

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  /* WHEN WE ARE LOADING DO NOT RENDER OUT THE CHILDREN */

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
