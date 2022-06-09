import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../Utilities/AuthContext";

interface Props {
  children: JSX.Element;
}

export const RequireEmployeeAuth = ({ children }: Props) => {
  if (localStorage.getItem("employee") !== "true") {
    return <Navigate to="/noauth" />;
  }
  return children;
};
