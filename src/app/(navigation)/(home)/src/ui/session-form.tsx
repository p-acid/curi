"use client";

import { memo } from "react";
import { Button, Textarea } from "@/components";
import {
  type Session,
  useCreateContentStore,
} from "@/store/use-create-content-store";

const SessionFormFields = memo(
  ({ id, startTime, endTime, description }: Session) => {
    const updateSession = useCreateContentStore((state) => state.updateSession);

    const handleStartTimeChange = (
      field: "period" | "hour" | "minute",
      value: string | number,
    ) => {
      updateSession(id, {
        startTime: {
          ...startTime,
          [field]: field === "period" ? value : Number(value),
        },
      });
    };

    const toggleStartPeriod = () => {
      updateSession(id, {
        startTime: {
          ...startTime,
          period: startTime.period === "am" ? "pm" : "am",
        },
      });
    };

    const handleEndTimeChange = (
      field: "period" | "hour" | "minute",
      value: string | number,
    ) => {
      updateSession(id, {
        endTime: {
          ...endTime,
          [field]: field === "period" ? value : Number(value),
        },
      });
    };

    const toggleEndPeriod = () => {
      updateSession(id, {
        endTime: {
          ...endTime,
          period: endTime.period === "am" ? "pm" : "am",
        },
      });
    };

    const handleDescriptionChange = (newDescription: string) => {
      updateSession(id, { description: newDescription });
    };

    return (
      <div className="flex flex-col gap-8 rounded-lg bg-[#F7F7F8] px-5 py-7">
        <div className="space-y-4">
          <p className="heading-2">회차 정보</p>
          <div className="space-y-3">
            <div className="flex items-center gap-6 max-mobile:gap-4">
              <span className="whitespace-pre font-semibold text-[#565656] text-lg max-mobile:text-base">
                날짜 선택
              </span>
              <button
                type="button"
                className="flex h-15 w-full items-center justify-center rounded-lg border border-[#E5E5E5] bg-background max-mobile:h-13"
              >
                <p className="text-[#8F8F8F] text-xl max-mobile:text-base">
                  날짜를 선택해주세요
                </p>
              </button>
            </div>

            <div className="flex items-center gap-6 max-mobile:gap-4">
              <span className="whitespace-pre font-semibold text-[#565656] text-lg max-mobile:text-base">
                시작 시간
              </span>
              <div className="flex h-15 w-full items-center justify-center rounded-lg border border-[#E5E5E5] bg-background max-mobile:h-13">
                <div className="flex min-w-20 items-center justify-center max-mobile:min-w-16">
                  <Button
                    color="primaryOutline"
                    size="small"
                    className="max-mobile:px-2"
                    onClick={toggleStartPeriod}
                  >
                    {startTime.period === "am" ? "오전" : "오후"}
                  </Button>
                </div>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={startTime.hour || ""}
                  onChange={(e) =>
                    handleStartTimeChange("hour", e.target.value)
                  }
                  className="w-full text-center font-medium text-xl outline-none max-mobile:text-lg"
                  placeholder="00"
                />
                <span className="font-medium text-lg">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={startTime.minute || ""}
                  onChange={(e) =>
                    handleStartTimeChange("minute", e.target.value)
                  }
                  className="w-full text-center font-medium text-xl outline-none max-mobile:text-lg"
                  placeholder="00"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 max-mobile:gap-4">
              <span className="whitespace-pre font-semibold text-[#565656] text-lg max-mobile:text-base">
                종료 시간
              </span>
              <div className="flex h-15 w-full items-center justify-center rounded-lg border border-[#E5E5E5] bg-background max-mobile:h-13">
                <div className="flex min-w-20 items-center justify-center max-mobile:min-w-16">
                  <Button
                    color="primaryOutline"
                    size="small"
                    className="max-mobile:px-2"
                    onClick={toggleEndPeriod}
                  >
                    {endTime.period === "am" ? "오전" : "오후"}
                  </Button>
                </div>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={endTime.hour || ""}
                  onChange={(e) => handleEndTimeChange("hour", e.target.value)}
                  className="w-full text-center font-medium text-xl outline-none max-mobile:text-lg"
                  placeholder="00"
                />
                <span className="font-medium text-lg">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={endTime.minute || ""}
                  onChange={(e) =>
                    handleEndTimeChange("minute", e.target.value)
                  }
                  className="w-full text-center font-medium text-xl outline-none max-mobile:text-lg"
                  placeholder="00"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="heading-2">활동 내용</p>
            <p className="title-2 text-[#767676]">
              날짜별 활동 내용을 간단히 적어주세요
            </p>
          </div>
          <Textarea
            placeholder="활동 내용을 간단히 입력해주세요"
            minLength={8}
            maxLength={800}
            value={description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
        </div>
      </div>
    );
  },
);

SessionFormFields.displayName = "SessionFormFields";

const AddSessionButton = () => {
  const addSession = useCreateContentStore((state) => state.addSession);

  const handleAddSession = () => {
    addSession({
      date: "",
      startTime: {
        period: "am",
        hour: 0,
        minute: 0,
      },
      endTime: {
        period: "am",
        hour: 0,
        minute: 0,
      },
      description: "",
    });
  };

  return (
    <div className="pt-6 max-mobile:px-4">
      <Button
        size="large"
        className="max-mobile:btn-medium w-full"
        onClick={handleAddSession}
      >
        회차 추가하기
      </Button>
    </div>
  );
};

export const SessionForm = () => {
  const sessions = useCreateContentStore((state) => state.sessions);

  return (
    <>
      <div className="box">
        <h3 className="heading-1">상세 정보</h3>
        {sessions.map((session) => (
          <SessionFormFields key={session.id} {...session} />
        ))}
      </div>
      <AddSessionButton />
    </>
  );
};
