import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
      },
      (error) => console.log(error)
    );
    return () => unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
