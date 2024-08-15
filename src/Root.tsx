import { ComponentType, lazy, LazyExoticComponent, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";

import Site from "./pages/public/Site";
import AuthLayout from "./layouts/AuthLayout";
import PublicLayout from "./layouts/PublicLayout";

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
const LoginPage = lazyHelp(() => import("./pages/public/LoginPage"));
const Dashboard = lazyHelp(() => import("./pages/Dashboard"));
const ClientsPage = lazyHelp(() => import("./pages/ClientsPage"));

export default function Root() {
  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
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
          <Route
            path={ROUTES.DASHBOARD.DASHBOARD}
            element={
              <AuthLayout>
                <Dashboard />
              </AuthLayout>
            }
          />
          <Route
            path={ROUTES.CLIENTS.CLIENTS}
            element={
              <AuthLayout>
                <ClientsPage />
              </AuthLayout>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}
