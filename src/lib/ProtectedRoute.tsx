import { Navigate } from "react-router-dom";
import { ROUTES } from "../routes";
import { useCurrentUser } from "../utils/useCurrentUser";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useCurrentUser();

  return user ? children : <Navigate to={ROUTES.LOGIN} />;
};

export default ProtectedRoute;
