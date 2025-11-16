"use client";

import { type ComponentProps, forwardRef, useState } from "react";

import { cn } from "@/libs/cn";

export interface TextareaProps extends ComponentProps<"textarea"> {
  error?: boolean;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error = false,
      helperText,
      minLength = 8,
      maxLength = 80,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue?.toString() ?? "",
    );

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value.toString() : uncontrolledValue;
    const currentLength = currentValue.length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    };

    const showCharCount = minLength !== undefined || maxLength !== undefined;

    return (
      <div className="flex w-full flex-col gap-1">
        <div
          className={cn(
            "rounded-lg border border-[#E5E5E5] bg-white focus-within:border-[#03C124]",
            { "border-[#E82929] focus-within:border-[#E82929]": error },
          )}
        >
          <textarea
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            maxLength={maxLength}
            className={cn(
              "min-h-[100px] w-full resize-none bg-transparent px-4 pt-4 pb-2 text-foreground text-lg caret-[#03C124] outline-none placeholder:text-[#8F8F8F] max-mobile:min-h-20 max-mobile:text-base",
              { "caret-[#E82929]": error },
              className,
            )}
            {...props}
          />

          {showCharCount && (
            <div className="flex justify-end gap-0.5 px-4 pt-2 pb-3 text-[#8F8F8F] text-sm">
              <span>
                {currentLength > maxLength ? maxLength : currentLength}
              </span>
              <span>
                {maxLength !== undefined && `/${maxLength}`}
                {minLength !== undefined && ` (최소 ${minLength}자)`}
              </span>
            </div>
          )}
        </div>

        {helperText && (
          <p
            className={cn("text-[#8F8F8F] text-sm", {
              "text-[#E82929]": error,
            })}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
