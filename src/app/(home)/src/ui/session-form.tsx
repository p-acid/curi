"use client";

import { overlay } from "overlay-kit";
import { memo } from "react";
import type { Matcher } from "react-day-picker";
import XIcon from "@/assets/icons/x.svg?component";
import { Button, Textarea } from "@/components";
import {
  type Session,
  useCreateContentStore,
} from "@/store/use-create-content-store";
import { DateSelect } from "./date-select";
import { SessionDeleteModal } from "./session-delete-modal";

interface SessionFormFieldsProps extends Session {
  dateDisabled: Matcher[];
  sessionNum?: number;
  onDelete?: () => void;
}

const SessionFormFields = memo(
  ({
    id,
    date,
    startTime,
    endTime,
    description,
    sessionNum,
    dateDisabled,
    onDelete,
  }: SessionFormFieldsProps) => {
    const updateSession = useCreateContentStore((state) => state.updateSession);

    const handleDate = (date: Date | undefined) => {
      if (date) {
        updateSession(id, {
          date: date.toDateString(),
        });
      }
    };

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
      <div className="relative flex flex-col gap-8 rounded-lg bg-[#F7F7F8] px-5 py-7">
        {onDelete && (
          <button
            className="absolute top-1 right-1 p-2.5"
            type="button"
            onClick={onDelete}
          >
            <XIcon className="size-7" />
          </button>
        )}

        <div className="space-y-4">
          <h3 className="heading-2">{sessionNum}회차 정보</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-6 max-mobile:gap-4">
              <span className="whitespace-pre font-semibold text-[#565656] text-lg max-mobile:text-base">
                날짜 선택
              </span>
              <DateSelect
                dateDisabled={dateDisabled}
                defaultValue={date ? new Date(date) : undefined}
                value={date ? new Date(date) : undefined}
                onSelect={handleDate}
              />
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
  const removeSession = useCreateContentStore((state) => state.removeSession);

  const isMultipleSession = sessions.length > 1;

  const openDeleteModal = (id: string) => {
    overlay.open(({ unmount }) => (
      <SessionDeleteModal
        onClose={unmount}
        onDelete={() => {
          removeSession(id);
          unmount();
        }}
      />
    ));
  };

  const getDateDisabled = (index: number): Matcher[] => {
    const previousSessions = sessions.slice(0, index);
    const latestPreviousDate = previousSessions.reduce<Date | null>(
      (latest, session) => {
        if (!session.date) return latest;
        const sessionDate = new Date(session.date);
        if (!latest || sessionDate > latest) return sessionDate;
        return latest;
      },
      null,
    );

    const nextSessions = sessions.slice(index + 1);
    const earliestNextDate = nextSessions.reduce<Date | null>(
      (earliest, session) => {
        if (!session.date) return earliest;
        const sessionDate = new Date(session.date);
        if (!earliest || sessionDate < earliest) return sessionDate;
        return earliest;
      },
      null,
    );

    const otherSessionDates = sessions
      .filter((_, i) => i !== index)
      .map((session) => session.date)
      .filter((date): date is string => !!date)
      .map((date) => new Date(date));

    const beforeDate = latestPreviousDate
      ? new Date(Math.max(latestPreviousDate.getTime(), Date.now()))
      : new Date();

    if (
      latestPreviousDate &&
      beforeDate.getTime() === latestPreviousDate.getTime()
    ) {
      beforeDate.setDate(beforeDate.getDate() + 1);
    }

    const dateDisabled: Matcher[] = [
      { before: beforeDate },
      ...(earliestNextDate ? [{ after: earliestNextDate }] : []),
      ...otherSessionDates.map((date) => date),
    ];

    return dateDisabled;
  };

  return (
    <>
      <div className="box">
        <h2 className="heading-1">상세 정보</h2>
        {sessions.map((session, index) => (
          <SessionFormFields
            key={session.id}
            dateDisabled={getDateDisabled(index)}
            sessionNum={isMultipleSession ? index + 1 : undefined}
            onDelete={
              isMultipleSession ? () => openDeleteModal(session.id) : undefined
            }
            {...session}
          />
        ))}
      </div>
      <AddSessionButton />
    </>
  );
};
