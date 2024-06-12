import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItemProps } from "@radix-ui/react-dropdown-menu";
import { FC, PropsWithChildren, ReactNode } from "react";

export type DropdownItem = DropdownMenuItemProps | "separator";

export interface IDropdownProps extends PropsWithChildren {
  trigger: ReactNode;
  label?: ReactNode;
  items: DropdownItem[];
}

export const Dropdown: FC<IDropdownProps> = (props) => {
  const { trigger, label, items, children } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {items.map((item, index) => {
          if (item === "separator") {
            return <DropdownMenuSeparator key={index} />;
          }
          return <DropdownMenuItem key={JSON.stringify(item)} {...item} />;
        })}
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
