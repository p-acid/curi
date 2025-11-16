"use client";

import { useEffect, useRef, useState } from "react";
import type { Matcher } from "react-day-picker";
import { Button, Calendar } from "@/components";
import { cn } from "@/libs/cn";

const formatDateToKorean = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

interface DateSelectProps {
  dateDisabled: Matcher[];
  defaultValue?: Date;
  value?: Date;
  onSelect?: (date: Date | undefined) => void;
}

export const DateSelect = ({
  dateDisabled,
  value,
  defaultValue,
  onSelect,
}: DateSelectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<Date>(defaultValue ?? new Date());
  const [isOpen, setIsOpen] = useState(false);

  const submit = () => {
    onSelect?.(selected);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        className="flex h-15 w-full items-center justify-center rounded-lg border border-[#E5E5E5] bg-background max-mobile:h-13"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p
          className={cn("text-[#8F8F8F] text-xl max-mobile:text-base", {
            "text-foreground": value,
          })}
        >
          {value ? formatDateToKorean(value) : "날짜를 선택해주세요"}
        </p>
      </button>

      {isOpen && (
        <div className="-translate-x-[50%] max-mobile:translate-0 absolute top-full left-1/2 z-10 mt-1 w-[330px] space-y-4 rounded-lg border border-[#E5E5E5] bg-white p-4 shadow-lg max-mobile:right-0 max-mobile:left-auto">
          <Calendar
            required
            disabled={[
              {
                before: new Date(),
              },
              ...dateDisabled,
            ]}
            mode="single"
            selected={selected}
            onSelect={setSelected}
          />
          <Button color="primarySolid" className="w-full" onClick={submit}>
            선택 완료
          </Button>
        </div>
      )}
    </div>
  );
};
