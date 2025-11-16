"use client";

import { overlay } from "overlay-kit";
import {
  type FormEventHandler,
  type KeyboardEvent,
  memo,
  useState,
} from "react";
import type { Matcher } from "react-day-picker";
import XIcon from "@/assets/icons/x.svg?component";
import { Button, Textarea } from "@/components";
import { toast } from "@/libs/toast";
import {
  type Session,
  type TimeValue,
  useCreateContentStore,
} from "@/store/use-create-content-store";
import { DateSelect } from "./date-select";
import { SessionDeleteModal } from "./session-delete-modal";
import { TimeInput } from "./time-input";

const convertTo24HourMinutes = (time: TimeValue): number => {
  let hour = time.hour;
  if (time.period === "pm" && hour !== 12) {
    hour += 12;
  } else if (time.period === "am" && hour === 12) {
    hour = 0;
  }
  return hour * 60 + time.minute;
};

const addOneHour = (time: TimeValue): TimeValue => {
  let newHour = time.hour + 1;
  let newPeriod = time.period;

  if (newHour === 12 && time.period === "am") {
    newPeriod = "pm";
  } else if (newHour === 13) {
    newHour = 1;
    newPeriod = time.period === "am" ? "pm" : "am";
  }

  return {
    period: newPeriod,
    hour: newHour > 12 ? newHour - 12 : newHour,
    minute: time.minute,
  };
};

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
    const [error, setError] = useState(false);

    const updateSession = useCreateContentStore((state) => state.updateSession);

    const handleDate = (date: Date | undefined) => {
      if (date) {
        updateSession(id, {
          date: date.toDateString(),
        });
      }
    };

    const handleStartPeriodChange = (period: "am" | "pm") => {
      updateSession(id, {
        startTime: { ...startTime, period },
        endTime: { ...endTime, period },
      });
    };

    const handleStartHourChange = (hour: number) => {
      const newStartTime = { ...startTime, hour };
      const newEndTime = addOneHour(newStartTime);
      updateSession(id, {
        startTime: newStartTime,
        endTime: newEndTime,
      });
    };

    const handleStartMinuteChange = (minute: number) => {
      const newStartTime = { ...startTime, minute };
      const newEndTime = addOneHour(newStartTime);
      updateSession(id, {
        startTime: newStartTime,
        endTime: newEndTime,
      });
    };

    const validateAndUpdateEndTime = (newEndTime: TimeValue) => {
      const startMinutes = convertTo24HourMinutes(startTime);
      const endMinutes = convertTo24HourMinutes(newEndTime);

      if (endMinutes <= startMinutes) {
        toast("시작 시간보다 종료시간은 빠를 수 없습니다.");
        const correctedEndTime = addOneHour(startTime);
        updateSession(id, { endTime: correctedEndTime });
      } else {
        updateSession(id, { endTime: newEndTime });
      }
    };

    const handleEndPeriodChange = (period: "am" | "pm") => {
      const newEndTime = { ...endTime, period };
      validateAndUpdateEndTime(newEndTime);
    };

    const handleEndHourChange = (hour: number) => {
      if (hour === 0) {
        updateSession(id, { endTime: { ...endTime, hour } });
        return;
      }

      const newEndTime = { ...endTime, hour };
      validateAndUpdateEndTime(newEndTime);
    };

    const handleEndMinuteChange = (minute: number) => {
      if (minute === 0) {
        updateSession(id, { endTime: { ...endTime, minute } });
        return;
      }

      const newEndTime = { ...endTime, minute };
      validateAndUpdateEndTime(newEndTime);
    };

    const handleDescriptionChange = (newDescription: string) => {
      updateSession(id, { description: newDescription });

      if (newDescription.length < 8) {
        setError(true);
      } else {
        setError(false);
      }
    };

    const handleInput: FormEventHandler<HTMLTextAreaElement> = (event) => {
      const maximum = 330;
      const changedHeight =
        event.currentTarget.scrollHeight > maximum
          ? maximum
          : event.currentTarget.scrollHeight;

      event.currentTarget.style.height = "auto";
      event.currentTarget.style.height = `${changedHeight}px`;
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
              <TimeInput
                value={startTime}
                onPeriodChange={handleStartPeriodChange}
                onHourChange={handleStartHourChange}
                onMinuteChange={handleStartMinuteChange}
              />
            </div>

            <div className="flex items-center gap-6 max-mobile:gap-4">
              <span className="whitespace-pre font-semibold text-[#565656] text-lg max-mobile:text-base">
                종료 시간
              </span>
              <TimeInput
                value={endTime}
                onPeriodChange={handleEndPeriodChange}
                onHourChange={handleEndHourChange}
                onMinuteChange={handleEndMinuteChange}
              />
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
            error={error}
            helperText={error ? "8자 이상 입력해주세요." : undefined}
            value={description}
            onInput={handleInput}
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
        hour: 10,
        minute: 0,
      },
      endTime: {
        period: "am",
        hour: 11,
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
