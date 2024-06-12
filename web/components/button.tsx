import { FC } from "react";
import { Button, ButtonProps } from "./ui/button";
import { LucideIcon } from "lucide-react";

export const IconButton: FC<ButtonProps & { icon: LucideIcon }> = (props) => {
  const { icon: Icon, children, ...rest } = props;
  return (
    <Button {...rest}>
      <Icon className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
};
