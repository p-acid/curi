"use client";

import { type ComponentProps, useEffect } from "react";
import XIcon from "@/assets/icons/x.svg?component";
import { cn } from "@/utils/cn";

export interface ModalProps extends ComponentProps<"div"> {
  onClose?: () => void;
}

export const Modal = ({
  children,
  className,
  onClose,
  ...props
}: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 max-mobile:px-4">
      <div
        className={cn(
          "relative w-full max-w-[430px] rounded-2xl bg-white max-mobile:rounded-xl",
          className,
        )}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        {onClose && (
          <button
            className="absolute top-4 right-4"
            type="button"
            onClick={onClose}
            aria-label="닫기"
          >
            <XIcon className="size-8 max-mobile:size-7" />
          </button>
        )}

        {children}
      </div>
    </div>
  );
};
