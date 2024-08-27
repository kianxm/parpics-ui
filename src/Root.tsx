import { ComponentType, lazy, LazyExoticComponent, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";

import Site from "./pages/public/Site";
import PublicLayout from "./layouts/PublicLayout";
import NewLayout from "./layouts/NewLayout";

import CreateClientPage from "./pages/CreateClientPage";
import ProtectedRoute from "./lib/ProtectedRoute";
import { ProtectedLayoutWrapper } from "./lib/ProtectedLayoutWrapper";
import Spinner from "./components/Spinner";

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
const SettingsProfilePage = lazyHelp(
  () => import("./pages/user/SettingsProfilePage")
);
const SettingsAccountPage = lazyHelp(
  () => import("./pages/user/SettingsAccountPage")
);
const SettingsAppearancePage = lazyHelp(
  () => import("./pages/user/SettingsAppearancePage")
);
const SettingsNotificationsPage = lazyHelp(
  () => import("./pages/user/SettingsNotificationsPage")
);
const SettingsDisplayPage = lazyHelp(
  () => import("./pages/user/SettingsDisplayPage")
);

export default function Root() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
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
        <Route path={ROUTES.USER.USER_ALBUM} element={<NewAlbumPage />} />

        <Route element={<ProtectedLayoutWrapper />}>
          <Route path={ROUTES.DASHBOARD.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.CLIENTS.CLIENTS} element={<ClientsPage />} />
          <Route path={ROUTES.CLIENTS.CREATE} element={<CreateClientPage />} />
          <Route path={ROUTES.CLIENTS.CLIENT} element={<ClientPage />} />
          <Route
            path={ROUTES.USER.SETTINGS.PROFILE}
            element={<SettingsProfilePage />}
          />
          <Route
            path={ROUTES.USER.SETTINGS.ACCOUNT}
            element={<SettingsAccountPage />}
          />
          <Route
            path={ROUTES.USER.SETTINGS.APPEARANCE}
            element={<SettingsAppearancePage />}
          />
          <Route
            path={ROUTES.USER.SETTINGS.NOTIFICATIONS}
            element={<SettingsNotificationsPage />}
          />
          <Route
            path={ROUTES.USER.SETTINGS.DISPLAY}
            element={<SettingsDisplayPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
