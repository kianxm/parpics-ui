import {
  ChartAreaIcon,
  Home,
  Package2,
  PanelLeft,
  Search,
  Settings,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ROUTES } from "../routes";
import { LOGO_SVG_PATH } from "../utils/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const NewLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            to={ROUTES.SITE}
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
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
                  to={ROUTES.ANALYTICS}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    isActive(ROUTES.ANALYTICS)
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
                  to="#"
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
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size={"icon"} variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to={ROUTES.SITE}
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Parpics</span>
                </Link>
                <Link
                  to={ROUTES.DASHBOARD.DASHBOARD}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to={ROUTES.CLIENTS.CLIENTS}
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <UsersIcon className="h-5 w-5" />
                  Clients
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <SettingsIcon className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={ROUTES.DASHBOARD.DASHBOARD}>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {pathSegments.length > 1 && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={location.pathname}>
                        {pathSegments[1].charAt(0).toUpperCase() +
                          pathSegments[1].slice(1)}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src={LOGO_SVG_PATH}
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 overflow-x-hidden">
          <div className="grid h-full items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-6">
            <div className="grid flex-1 h-full auto-rows-max items-start gap-4 lg:col-span-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewLayout;
