import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export const RequireEmployeeAuth = ({ children }: Props) => {
  if (localStorage.getItem("employee") !== "true") {
    return <Navigate to="/noauth" />;
  }
  return children;
};
