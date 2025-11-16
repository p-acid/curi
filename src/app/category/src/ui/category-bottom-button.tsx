"use client";

import { BottomButton } from "@/layouts/bottom-button";
import { useCategoryLayout } from "../model";

export const CategoryBottomButton = () => {
  const { nextDisabled, goNext } = useCategoryLayout();

  return (
    <BottomButton disabled={nextDisabled} onClick={goNext}>
      다음으로
    </BottomButton>
  );
};
