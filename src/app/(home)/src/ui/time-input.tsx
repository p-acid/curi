"use client";

import { Button } from "@/components";

interface TimeValue {
  period: "am" | "pm";
  hour: number;
  minute: number;
}

interface TimeInputProps {
  value: TimeValue;
  onChange: (value: TimeValue) => void;
}

export const TimeInput = ({ value, onChange }: TimeInputProps) => {
  const handlePeriodToggle = () => {
    onChange({
      ...value,
      period: value.period === "am" ? "pm" : "am",
    });
  };

  const handleHourChange = (hour: string) => {
    onChange({
      ...value,
      hour: Number(hour),
    });
  };

  const handleMinuteChange = (minute: string) => {
    onChange({
      ...value,
      minute: Number(minute),
    });
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
        onChange={(e) => handleHourChange(e.target.value)}
        className="w-full text-center font-medium text-xl outline-none max-mobile:text-lg"
        placeholder="00"
      />
      <span className="font-medium text-lg">:</span>
      <input
        type="number"
        min="0"
        max="59"
        value={value.minute || ""}
        onChange={(e) => handleMinuteChange(e.target.value)}
        className="w-full text-center font-medium text-xl outline-none max-mobile:text-lg"
        placeholder="00"
      />
    </div>
  );
};
