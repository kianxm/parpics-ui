import { Separator } from "../components/ui/separator";
import { SettingsSidebar } from "../components/user/settings/SettingsSidebar";
import { ROUTES } from "../routes";

const sidebarNavItems = [
  { title: "Profile", href: ROUTES.USER.SETTINGS.PROFILE, disabled: false },
  { title: "Account", href: ROUTES.USER.SETTINGS.ACCOUNT, disabled: false },
  {
    title: "Appearance",
    href: ROUTES.USER.SETTINGS.APPEARANCE,
    disabled: false,
  },
  {
    title: "Notifications",
    href: ROUTES.USER.SETTINGS.NOTIFICATIONS,
    disabled: true,
  },
  { title: "Display", href: ROUTES.USER.SETTINGS.DISPLAY, disabled: true },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-4 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SettingsSidebar items={sidebarNavItems} />
          </aside>
          <div className="flex-1 max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
