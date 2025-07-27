"use client";
import { ClassValue } from "clsx";
import { X } from "lucide-react";
import { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils/functions";
import { Button, ButtonProps } from "../button";
import { LoadingOverlay } from "../loading-overlay";
import { Overlay, OverlayProps } from "./overlay";

type ModalProps = Pick<OverlayProps, "isActive" | "onClose"> &
  Omit<ModalFooterProps, "className"> & {
    id?: string;
    className?: ClassValue;
    style?: CSSProperties;
    children: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
    /** Default to true */
    withCloseButton?: boolean;
    isLoading?: boolean;
    afterClose?: () => void;
  };

export const Modal = ({
  id,
  className,
  style,
  children,
  title,
  description,
  withCloseButton = true,
  isActive,
  isLoading,
  onClose,
  afterClose,
  ...footerProps
}: ModalProps) => {
  const handleCancel = () => {
    onClose();
    footerProps.onCancel?.();
  };

  const handleTransitionEnd = (isActive: boolean) => {
    if (!isActive) {
      afterClose?.();
    }
  };

  return (
    <Overlay isActive={isActive} onClose={onClose} onTransitionEnd={handleTransitionEnd}>
      <div
        role="dialog"
        aria-modal="true"
        id={id}
        className={cn(
          "p-4 w-full max-w-[calc(100%-2rem)] sm:max-w-[425px] max-h-[calc(100%-2rem)] bg-background border rounded shadow-lg",
          "opacity-0 group-data-[state=open]/overlay:opacity-100 scale-95 group-data-[state=open]/overlay:scale-100",
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-200 flex flex-col gap-4",
          className,
        )}
        style={style}
      >
        {withCloseButton ? (
          <button
            type="button"
            className="absolute top-3 right-3 size-6 flex items-center justify-center opacity-70 hover:opacity-100"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="size-5" />
          </button>
        ) : null}

        <div className="pb-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold leading-none">{title}</h2>
            {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          </div>
          <div className="mt-4 h-[1.5px] w-full bg-linear-to-r from-border to-transparent" />
        </div>

        <div className="relative -mx-4 px-4 -my-2 py-2">
          {children}
          <LoadingOverlay isLoading={isLoading} />
        </div>

        <ModalFooter {...footerProps} onCancel={handleCancel} />
      </div>
    </Overlay>
  );
};

type ModalFooterProps = {
  className?: ClassValue;
  confirmText?: string;
  cancelText?: string;
  confirmBtnProps?: Omit<ButtonProps, "onClick" | "children">;
  cancelBtnProps?: Omit<ButtonProps, "onClick" | "children">;
  onCancel?: () => void;
  onConfirm?: () => void;
};
function ModalFooter({
  className,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmBtnProps,
  cancelBtnProps,
  onCancel,
  onConfirm,
}: ModalFooterProps) {
  return (
    <div className={cn("flex gap-2 justify-end", className)}>
      <Button variant="outline" onClick={onCancel} {...cancelBtnProps}>
        {cancelText}
      </Button>
      <Button
        variant="default"
        color="secondary"
        onClick={onConfirm}
        {...confirmBtnProps}
        className="w-full sm:w-auto"
      >
        {confirmText}
      </Button>
    </div>
  );
}
