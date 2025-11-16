"use client";

import { type ChangeEvent, useState } from "react";

import { Textarea } from "@/components";
import { toast } from "@/libs/toast";
import { useCreateContentStore } from "@/store/use-create-content-store";

const TitleTextarea = () => {
  const [error, setError] = useState(false);

  const title = useCreateContentStore((state) => state.title);
  const setTitle = useCreateContentStore((state) => state.setTitle);

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement>) => {
    if (/\s{2,}/.test(value)) {
      toast("연속 공백은 사용할 수 없습니다");
      return;
    }

    setTitle(value);

    if (value.length < 8) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <Textarea
      placeholder="제목을 입력해주세요"
      minLength={8}
      maxLength={80}
      value={title}
      onChange={handleChange}
      error={error}
      helperText={error ? "8자 이상 입력해주세요." : undefined}
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
