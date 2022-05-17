import React, { createContext, useState, useEffect } from "react";
import { UserType } from "./types";

interface AuthContextInterface {
  login: () => void;
  logout: () => void;
  loggedIn: boolean;
  user: UserType | null;
  owner: boolean;
  employee: boolean;
}

const AuthContext = createContext({} as AuthContextInterface);

export const AuthProvider: React.FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [owner, setOwner] = useState(false);
  const [employee, setEmployee] = useState(false);

  useEffect(() => {
    if (
      localStorage.hasOwnProperty("jwt") &&
      localStorage.hasOwnProperty("user")
    ) {
      setLoggedIn(true);
      const pulledUser = localStorage.getItem("user");
      const parsedUser: UserType =
        pulledUser !== null ? JSON.parse(pulledUser) : null;
      setUser(parsedUser);
      setOwner(parsedUser.storeOwner);
      setEmployee(parsedUser.employee);
    }
    if (
      !localStorage.hasOwnProperty("jwt") ||
      !localStorage.hasOwnProperty("user")
    ) {
      setLoggedIn(false);
      setUser(null);
    }
  }, []);

  const login = () => {
    setLoggedIn(true);
    const pulledUser = localStorage.getItem("user");
    const parsedUser: UserType =
      pulledUser !== null ? JSON.parse(pulledUser) : null;
    setUser(parsedUser);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const authContextValue: AuthContextInterface = {
    login,
    logout,
    loggedIn,
    user,
    owner,
    employee,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthContext;
