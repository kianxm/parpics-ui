import { ComponentType, lazy, LazyExoticComponent, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";

import Site from "./pages/public/Site";
// import AuthLayout from "./layouts/AuthLayout";
import PublicLayout from "./layouts/PublicLayout";
import NewLayout from "./layouts/NewLayout";

import CreateClientPage from "./pages/CreateClientPage";
import ProtectedRoute from "./lib/ProtectedRoute";

function lazyHelp<T extends Record<string, ComponentType<any>>>(
  fn: () => Promise<T>,
  name?: keyof T
): LazyExoticComponent<ComponentType<any>> {
  return lazy(() =>
    fn().then((module) => ({
      default: module[name || "default"],
    }))
  );
}
const PricingPage = lazyHelp(() => import("./pages/public/PricingPage"));
const SignUpPage = lazyHelp(() => import("./pages/public/SignUpPage"));
const LoginPage = lazyHelp(() => import("./pages/public/LoginPage"));
const Dashboard = lazyHelp(() => import("./pages/Dashboard"));
const ClientsPage = lazyHelp(() => import("./pages/ClientsPage"));
const ClientPage = lazyHelp(() => import("./pages/ClientPage"));
const UserAccessPage = lazyHelp(() => import("./pages/public/UserAccessPage"));
const NewAlbumPage = lazyHelp(() => import("./pages/user/NewAlbumPage"));

export default function Root() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path={ROUTES.SITE}
          element={
            <PublicLayout>
              <Site />
            </PublicLayout>
          }
        />
        <Route path={ROUTES.PRICING} element={<PricingPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />

        <Route path={ROUTES.USER_ACCESS} element={<UserAccessPage />} />

        <Route path={ROUTES.USER_ALBUM} element={<NewAlbumPage />} />

        <Route
          path={ROUTES.DASHBOARD.DASHBOARD}
          element={
            <ProtectedRoute
              element={
                <NewLayout>
                  <Dashboard />
                </NewLayout>
              }
            />
          }
        />
        <Route
          path={ROUTES.CLIENTS.CLIENTS}
          element={
            <ProtectedRoute
              element={
                <NewLayout>
                  <ClientsPage />
                </NewLayout>
              }
            />
          }
        />
        <Route
          path={ROUTES.CLIENTS.CREATE}
          element={
            <ProtectedRoute
              element={
                <NewLayout>
                  <CreateClientPage />
                </NewLayout>
              }
            />
          }
        />
        <Route
          path={ROUTES.CLIENTS.CLIENT}
          element={
            <ProtectedRoute
              element={
                <NewLayout>
                  <ClientPage />
                </NewLayout>
              }
            />
          }
        />
        <Route
          path={ROUTES.CLIENTS.CLIENT}
          element={
            <ProtectedRoute
              element={
                <NewLayout>
                  <ClientPage />
                </NewLayout>
              }
            />
          }
        />
      </Routes>
    </Suspense>
  );
}
