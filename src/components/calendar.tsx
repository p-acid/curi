"use client";

import { ko } from "date-fns/locale";
import {
  type DayButtonProps,
  DayPicker,
  type DayPickerProps,
  type MonthCaptionProps,
  type MonthGridProps,
  type NavProps,
  type WeekdayProps,
} from "react-day-picker";
import ChevronLeftIcon from "@/assets/icons/chevron-left.svg?component";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg?component";
import { cn } from "@/libs/cn";

const DayButton = (props: DayButtonProps) => {
  const { day, modifiers, ...buttonProps } = props;

  const isSelected = modifiers.selected;
  const isDisabled = modifiers.disabled;
  const isOutside = modifiers.outside;

  return (
    <button
      {...buttonProps}
      className={cn("relative h-10 w-full rounded-md font-medium text-lg", {
        "bg-[#03C124] font-bold text-white": isSelected,
        "text-foreground hover:bg-[#F7F7F8]":
          !isSelected && !isDisabled && !isOutside,
        "cursor-not-allowed bg-transparent text-[#E5E5E5] hover:bg-transparent":
          isDisabled,
        "text-[#8F8F8F] hover:bg-[#F7F7F8]":
          isOutside && !isDisabled && !isSelected,
      })}
      disabled={isDisabled}
    >
      {day.date.getDate()}
    </button>
  );
};

const MonthCaption = (props: MonthCaptionProps) => {
  return (
    <div className="relative mb-4 flex h-[30px] items-center">
      <h2 className="font-semibold text-base text-foreground">
        {props.children}
      </h2>
    </div>
  );
};

const Nav = ({ children, onPreviousClick, onNextClick }: NavProps) => {
  return (
    <nav className="absolute top-0 right-0 z-10 flex gap-0.5">
      {children}
      <button
        type="button"
        className="flex size-[30px] items-center justify-center rounded-md border border-[#E5E5E5]"
        onClick={onPreviousClick}
      >
        <ChevronLeftIcon className="size-5 text-foreground" />
      </button>
      <button
        type="button"
        className="flex size-[30px] items-center justify-center rounded-md border border-[#E5E5E5]"
        onClick={onNextClick}
      >
        <ChevronRightIcon className="size-5 text-foreground" />
      </button>
    </nav>
  );
};

const Weekday = ({ className, ...props }: WeekdayProps) => {
  return (
    <th className={cn("pb-2 text-[#323232] text-base", className)} {...props} />
  );
};

const MonthGrid = ({ children, className, ...props }: MonthGridProps) => {
  return (
    <table className={cn("w-full", className)} {...props}>
      {children}
    </table>
  );
};

export const Calendar = (props: DayPickerProps) => {
  return (
    <DayPicker
      className="relative"
      showOutsideDays
      weekStartsOn={1}
      locale={ko}
      components={{
        DayButton,
        MonthCaption,
        Nav,
        Weekday,
        MonthGrid,
      }}
      {...props}
    />
  );
};
