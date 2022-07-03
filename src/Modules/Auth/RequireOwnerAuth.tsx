import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export const RequireOwnerAuth = ({ children }: Props) => {
  if (localStorage.getItem("owner") !== "true") {
    return <Navigate to="/noauth" />;
  }
  return children;
};
