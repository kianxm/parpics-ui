import React, { useContext, useState } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { PersonStanding } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import { ROUTES } from "../../routes";
import { Button } from "../ui/button";
import { SidebarBody, SidebarLink, SidebarProvider } from "../ui/sidebar";
import { LOGO_ALT, LOGO_SVG_PATH } from "../../utils/constants";
import { AuthContext } from "../../context/context";

export function NewSidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate(ROUTES.SITE);
  };

  console.log(user);

  const SidebarLinks = [
    {
      label: "Dashboard",
      href: ROUTES.DASHBOARD.DASHBOARD,
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Clients",
      href: ROUTES.CLIENTS.CLIENTS,
      icon: (
        <PersonStanding className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto overflow-hidden",
        "h-screen"
      )}
    >
      <SidebarProvider open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {SidebarLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <Button variant="custom" className="mx-0 px-0" onClick={onLogout}>
              <IconArrowLeft className="h-5 w-5 text-black" />
            </Button>
            <SidebarLink
              link={{
                label: user.email,
                href: "#",
                icon: (
                  <img
                    src={LOGO_SVG_PATH}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt={LOGO_ALT}
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </SidebarProvider>
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl rounded-bl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to={ROUTES.SITE}
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img
        src={LOGO_SVG_PATH}
        className="h-7 w-7"
        width={50}
        height={50}
        alt="Avatar"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Parpics
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to={ROUTES.SITE}
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img
        src={LOGO_SVG_PATH}
        className="h-7 w-7"
        width={50}
        height={50}
        alt={LOGO_ALT}
      />
    </Link>
  );
};

// Dummy dashboard component with content
export const SkeletonLoading = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl rounded-bl-2xl bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((_, i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((_, i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
