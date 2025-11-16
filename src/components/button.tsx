import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/libs/cn";

const buttonVariants = cva(
  "inline-flex w-fit items-center justify-center whitespace-pre font-semibold active:font-bold disabled:pointer-events-none",
  {
    variants: {
      color: {
        graySolid:
          "bg-[#323232] text-white hover:bg-[#565656] active:bg-foreground disabled:bg-[#D7D7D7]",
        primarySolid:
          "bg-[#03C124] text-white hover:bg-[#02891A] active:bg-[#026A14] disabled:bg-[#D7D7D7]",
        primaryOutline:
          "border border-[#BABABA] bg-[#F7F7F8] text-[#323232] hover:bg-[#E5E5E5] active:border-[#03C124] active:bg-[#E6F9E9] active:text-[#03C124] disabled:border-[#D7D7D7] disabled:bg-[#E5E5E5] disabled:text-[#8F8F8F]",
      },
      size: {
        small: "btn-small",
        medium: "btn-medium",
        large: "btn-large",
      },
      /**
       * `compoundVariants` 를 위한 `variants` 필드
       * `color` 와 결합되어 스타일 적용
       */
      active: {
        true: "",
      },
    },
    compoundVariants: [
      {
        color: "graySolid",
        active: true,
        className: "bg-foreground hover:bg-foreground",
      },
      {
        color: "primarySolid",
        active: true,
        className: "bg-[#02891A] hover:bg-[#02891A]",
      },
      {
        color: "primaryOutline",
        active: true,
        className:
          "border-[#03C124] bg-[#E6F9E9] text-[#03C124] hover:border-[#03C124] hover:bg-[#E6F9E9] hover:text-[#03C124]",
      },
    ],
    defaultVariants: {
      color: "graySolid",
      size: "medium",
      active: false,
    },
  },
);

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, color, size, active, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ color, size, active, className }))}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
