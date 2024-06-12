import { FC } from "react";
import { NavLink, NavLinkProps } from "@remix-run/react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface INavigationProps {
  className?: string;
  links: Array<NavLinkProps & { icon: LucideIcon; label: string }>;
}

export const Navigation: FC<INavigationProps> = (props) => {
  const { className, links } = props;
  return (
    <nav className={cn("grid text-sm font-medium", className)}>
      {links.map((link) => {
        const { icon: Icon, label, ...rest } = link;
        return (
          <NavLink
            key={link.to.toString()}
            {...rest}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 hover:text-gray-900 dark:hover:text-gray-50",
                isActive
                  ? "bg-gray-100 text-gray-900  transition-colors dark:bg-gray-800 dark:text-gray-50"
                  : "text-gray-500 transition-colors dark:text-gray-400 font-light",
                link.className
              )
            }
            prefetch="none"
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        );
      })}
    </nav>
  );
};
