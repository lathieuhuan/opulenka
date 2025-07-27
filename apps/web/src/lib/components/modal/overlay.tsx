"use client";
import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

export interface OverlayProps {
  isActive?: boolean;
  /** Default to true */
  closeOnMaskClick?: boolean;
  /** Default to true */
  closeOnEscape?: boolean;
  children: ReactNode;
  onClose: () => void;
  onTransitionEnd?: (isActive: boolean) => void;
  getContainer?: () => HTMLElement | null;
}
export function Overlay({
  isActive = false,
  closeOnMaskClick = true,
  closeOnEscape = true,
  children,
  onClose,
  onTransitionEnd,
  getContainer,
}: OverlayProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isActive_, setIsActive_] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsMounted(true);
        setIsActive_(true);
      }, 50);
    }
  }, [isActive]);

  useEffect(() => {
    const handlePressEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape) {
        onClose();
      }
    };
    document.addEventListener("keydown", handlePressEsc, true);

    return () => {
      document.removeEventListener("keydown", handlePressEsc, true);
    };
  }, [closeOnEscape]);

  const handleTransitionEnd = () => {
    if (!isActive) {
      setIsMounted(false);
      setIsActive_(false);
    }
    onTransitionEnd?.(isActive);
  };

  const handleMaskClick = () => {
    if (closeOnMaskClick) {
      onClose();
    }
  };

  return (isMounted || isActive) && typeof document !== "undefined"
    ? ReactDOM.createPortal(
        <div
          data-slot="overlay"
          data-state={isActive && isActive_ ? "open" : "closed"}
          className="group/overlay fixed top-0 right-0 bottom-0 left-0 z-50"
        >
          <Mask onTransitionEnd={handleTransitionEnd} onClick={handleMaskClick} />

          {children}
        </div>,
        getContainer?.() ?? document.body,
      )
    : null;
}

type MaskProps = {
  onTransitionEnd: () => void;
  onClick: () => void;
};

function Mask({ onTransitionEnd, onClick }: MaskProps) {
  // useEffect(() => {
  //   const originalOverflow = document.body.style.overflow;
  //   document.body.style.overflow = "hidden";

  //   return () => {
  //     document.body.style.overflow = originalOverflow;
  //   };
  // }, []);

  return (
    <div
      className="size-full bg-black opacity-20 group-data-[state=open]/overlay:opacity-60 transition-opacity duration-200 ease-in-out"
      onTransitionEnd={onTransitionEnd}
      onClick={onClick}
    />
  );
}
