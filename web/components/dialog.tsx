import {
  Dialog as UIDialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, PropsWithChildren, ReactNode } from "react";

export interface IDialogProps extends PropsWithChildren {
  trigger: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Dialog: FC<IDialogProps> = (props) => {
  const { title, trigger, description, children, open, onOpenChange } = props;
  return (
    <UIDialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        {(title || description) && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </UIDialog>
  );
};
