import React, { createContext, useEffect, useState } from "react";

interface AuthProviderProps {
  children: JSX.Element;
}

const AuthContext = createContext({});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (
      // Find user in localStorage or cookies
      1 === 1
    ) {
      setLoggedIn(true);
    }
  });

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const authContextValue = {
    login,
    loggedIn,
  };

  return <AuthContext.Provider value={authContextValue} {...children} />;
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthContext;
