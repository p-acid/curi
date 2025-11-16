"use client";

import { Button } from "@/components";
import { useCreateContentStore } from "@/store/use-create-content-store";

const MeetingTypeButtons = () => {
  const meetingType = useCreateContentStore((state) => state.meetingType);
  const setMeetingType = useCreateContentStore((state) => state.setMeetingType);

  return (
    <div className="flex gap-2">
      <Button
        color="primaryOutline"
        active={meetingType === "online"}
        size="large"
        className="max-mobile:btn-medium w-full"
        onClick={() => setMeetingType("online")}
      >
        온라인
      </Button>
      <Button
        color="primaryOutline"
        active={meetingType === "offline"}
        size="large"
        className="max-mobile:btn-medium w-full"
        onClick={() => setMeetingType("offline")}
      >
        직접 만나기
      </Button>
    </div>
  );
};

export const MeetingTypeSelector = () => {
  return (
    <div className="box">
      <div className="space-y-2">
        <h2 className="heading-1">활동 방식 선택</h2>
        <p className="title-1 text-[#767676]">
          만남을 어떤 방식으로 진행하시겠어요?
        </p>
      </div>
      <MeetingTypeButtons />
    </div>
  );
};
