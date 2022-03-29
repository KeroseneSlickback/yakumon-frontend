import React, { createContext, useState, useEffect } from "react";

interface AuthContextInterface {
  login?: () => void;
  logout?: () => void;
  loggedIn?: boolean;
}

const AuthContext = createContext({} as AuthContextInterface);

export const AuthProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (
      localStorage.hasOwnProperty("jwt") &&
      localStorage.hasOwnProperty("user")
    ) {
      setLoggedIn(true);
    }
  }, []);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const authContextValue: AuthContextInterface = {
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
