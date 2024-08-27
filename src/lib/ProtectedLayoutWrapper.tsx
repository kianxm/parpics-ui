import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import NewLayout from "../layouts/NewLayout";

export function ProtectedLayoutWrapper() {
  return (
    <ProtectedRoute>
      <NewLayout>
        <Outlet />
      </NewLayout>
    </ProtectedRoute>
  );
}
