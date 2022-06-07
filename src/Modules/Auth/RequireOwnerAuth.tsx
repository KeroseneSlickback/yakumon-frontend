import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../Utilities/AuthContext";

interface Props {
  children: JSX.Element;
}

export const RequireOwnerAuth = ({ children }: Props) => {
  if (localStorage.getItem("owner") !== "true") {
    return <Navigate to="/noauth" />;
  }
  return children;
};
