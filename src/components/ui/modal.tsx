import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import React, { ReactNode, SetStateAction } from "react";
import { Button } from "./button";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ModalProps {
  btnLabel: string | React.ReactNode;
  children: ReactNode;
  description?: string;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  title: string;
}

const Modal = ({
  btnLabel,
  children,
  description,
  open,
  setOpen,
  title,
}: ModalProps) => {
  const isMobile = useMediaQuery();
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          {typeof btnLabel === "string" ? (
            <Button>{btnLabel}</Button>
          ) : (
            btnLabel
          )}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">{children}</div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {typeof btnLabel === "string" ? <Button>{btnLabel}</Button> : btnLabel}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
