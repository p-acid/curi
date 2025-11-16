"use client";

import { Textarea } from "@/components";
import { useCreateContentStore } from "@/store/use-create-content-store";

const TitleTextarea = () => {
  const title = useCreateContentStore((state) => state.title);
  const setTitle = useCreateContentStore((state) => state.setTitle);

  return (
    <Textarea
      placeholder="제목을 입력해주세요"
      minLength={8}
      maxLength={80}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

export const TitleInput = () => {
  return (
    <div className="box">
      <h2 className="heading-1">콘텐츠 제목</h2>
      <TitleTextarea />
    </div>
  );
};
