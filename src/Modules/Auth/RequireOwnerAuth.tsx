import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../Utilities/AuthContext";

interface Props {
  children: JSX.Element;
}

export const RequireOwnerAuth = ({ children }: Props) => {
  const authContext = useContext(AuthContext);
  if (!authContext.owner) {
    return <Navigate to="/noauth" />;
  }
  return children;
};
