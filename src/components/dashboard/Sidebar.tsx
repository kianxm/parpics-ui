import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes";
import {
  BellIcon,
  CameraIcon,
  ChartAreaIcon,
  Home,
  Settings,
  UsersIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to={ROUTES.SITE}
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <CameraIcon className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Parpics</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={ROUTES.DASHBOARD.DASHBOARD}
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  isActive(ROUTES.DASHBOARD.DASHBOARD)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                } transition-colors md:h-8 md:w-8`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={ROUTES.DASHBOARD.NOTIFICATIONS}
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  isActive(ROUTES.DASHBOARD.NOTIFICATIONS)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                } transition-colors md:h-8 md:w-8`}
              >
                <BellIcon className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Notifications</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={ROUTES.CLIENTS.CLIENTS}
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  isActive(ROUTES.CLIENTS.CLIENTS)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                } transition-colors md:h-8 md:w-8`}
              >
                <UsersIcon className="h-5 w-5" />
                <span className="sr-only">Clients</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Clients</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={ROUTES.DASHBOARD.ANALYTICS}
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  isActive(ROUTES.DASHBOARD.ANALYTICS)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                } transition-colors md:h-8 md:w-8`}
              >
                <ChartAreaIcon className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={ROUTES.USER.SETTINGS.PROFILE}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;
