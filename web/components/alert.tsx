import { FC, PropsWithChildren, ReactNode } from "react";
import {
  Alert as UIAlert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export interface IAlertProps extends PropsWithChildren {
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  title: string;
  icon?: ReactNode;
}

export const Alert: FC<IAlertProps> = (props) => {
  const {
    className,
    title,
    titleClassName,
    descriptionClassName,
    children,
    icon,
  } = props;
  return (
    <UIAlert className={className}>
      {icon}
      <AlertTitle className={titleClassName}>{title}</AlertTitle>
      <AlertDescription className={descriptionClassName}>
        {children}
      </AlertDescription>
    </UIAlert>
  );
};
