import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../Utilities/AuthContext";

interface Props {
  children: JSX.Element;
}

export const RequireEmployeeAuth = ({ children }: Props) => {
  const authContext = useContext(AuthContext);
  if (!authContext.employee) {
    return <Navigate to="/" />;
  }
  return children;
};
