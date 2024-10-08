import { Link, useLocation } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { buttonVariants } from "../../ui/button";

interface SettingsSidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    disabled: boolean;
  }[];
}

export function SettingsSidebar({
  className,
  items,
  ...props
}: SettingsSidebarProps) {
  const { pathname } = useLocation();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.disabled ? "#" : item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            item.disabled
              ? "text-gray-500 cursor-not-allowed" // Disabled styles
              : "text-current",
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
