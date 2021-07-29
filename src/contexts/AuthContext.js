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

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
    /* RETURNS A PROMISE */
  }

  /* createUserWithEmailAndPassword() automatically calls setCurrentUser */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    /* onAuthStateChanged() returns a function which upon called unsubscribes the onAuthStateChanged event */

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
