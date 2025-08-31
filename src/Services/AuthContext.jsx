import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const savedData = localStorage.getItem("authData");
  const parsed = JSON.parse(savedData);

  const [authUser, setAuthUser] =  parsed.authUser != null ? useState(parsed.authUser) : useState(null);
  const [isLoggedIn, setIsLoggedIn] = parsed.isLoggedIn ? useState(true) : useState(false);
  const [userId, setUserId] = parsed.userId != null ?  useState(parsed.userId) : useState('');


  //save only after initial load is done
  useEffect(() => {
    localStorage.setItem("authData",
      JSON.stringify({authUser, isLoggedIn, userId})
    );
    console.log('from 2nd block')

  }, [authUser, isLoggedIn, userId]);
  
  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    userId,
    setUserId
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
