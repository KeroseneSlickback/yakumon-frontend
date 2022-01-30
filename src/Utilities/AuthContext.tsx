import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  // useEffect(() => {
  //   if (
  //     // Find user in localStorage or cookies
  //     1 === 1
  //   ) {
  //     setLoggedIn(true);
  //   }
  // }, []);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const authContextValue = {
    login,
    logout,
    loggedIn,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthContext;
