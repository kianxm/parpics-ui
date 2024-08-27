import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/context";
import { ROUTES } from "../routes";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to={ROUTES.LOGIN} />;
};

export default ProtectedRoute;
