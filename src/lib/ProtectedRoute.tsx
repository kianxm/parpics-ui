import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/context";
import { ROUTES } from "../routes";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);

  return user ? element : <Navigate to={ROUTES.LOGIN} />;
};

export default ProtectedRoute;
