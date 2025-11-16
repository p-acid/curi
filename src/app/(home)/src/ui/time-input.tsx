"use client";

import { Button } from "@/components";

interface TimeValue {
  period: "am" | "pm";
  hour: number;
  minute: number;
}

interface TimeInputProps {
  value: TimeValue;
  onPeriodChange: (period: "am" | "pm") => void;
  onHourChange: (hour: number) => void;
  onMinuteChange: (minute: number) => void;
}

export const TimeInput = ({
  value,
  onPeriodChange,
  onHourChange,
  onMinuteChange,
}: TimeInputProps) => {
  const handlePeriodToggle = () => {
    onPeriodChange(value.period === "am" ? "pm" : "am");
  };

  const handleHourInputChange = (hourStr: string) => {
    if (hourStr === "") {
      onHourChange(0);
      return;
    }

    if (hourStr.length > 2) {
      return;
    }

    const hour = Number(hourStr);

    if (hour >= 1 && hour <= 12) {
      onHourChange(hour);
    }
  };

  const handleMinuteInputChange = (minuteStr: string) => {
    if (minuteStr === "") {
      onMinuteChange(0);
      return;
    }

    if (minuteStr.length > 2) {
      return;
    }

    const minute = Number(minuteStr);

    if (minute >= 0 && minute <= 59) {
      onMinuteChange(minute);
    }
  };

  return (
    <div className="flex h-15 w-full items-center justify-center rounded-lg border border-[#E5E5E5] bg-background max-mobile:h-13">
      <div className="flex min-w-20 items-center justify-center max-mobile:min-w-16">
        <Button
          color="primaryOutline"
          size="small"
          className="max-mobile:px-2"
          onClick={handlePeriodToggle}
        >
          {value.period === "am" ? "오전" : "오후"}
        </Button>
      </div>
      <input
        type="number"
        min="1"
        max="12"
        value={value.hour || ""}
        onChange={(e) => handleHourInputChange(e.target.value)}
        className="w-full text-center font-medium text-xl outline-none max-mobile:text-lg"
        placeholder="00"
      />
      <span className="font-medium text-lg">:</span>
      <input
        type="number"
        min="0"
        max="59"
        value={value.minute || ""}
        onChange={(e) => handleMinuteInputChange(e.target.value)}
        className="w-full text-center font-medium text-xl outline-none max-mobile:text-lg"
        placeholder="00"
      />
    </div>
  );
};
