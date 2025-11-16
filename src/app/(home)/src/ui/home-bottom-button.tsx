"use client";

import { BottomButton } from "@/layouts/bottom-button";
import { useHomeLayout } from "../model";

export const HomeBottomButton = () => {
  const { nextDisabled } = useHomeLayout();

  return <BottomButton disabled={nextDisabled}>다음으로</BottomButton>;
};
