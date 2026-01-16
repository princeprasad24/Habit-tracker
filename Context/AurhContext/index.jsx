import { auth } from "../../fireBase/fireBase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();



export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const signOutUser =  async () => {
    await auth.signOut();
  }

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, initializeUser);

    return unSubscribe;
  }, []);

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    signOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
