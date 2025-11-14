"use client";

import type { PropsWithChildren } from "react";
import { BottomButton } from "@/layouts/bottom-button";
import { Header } from "@/layouts/header";

const CategoryLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header title="카테고리" onExit={console.log} />
      {children}
      <BottomButton>다음으로</BottomButton>
    </div>
  );
};

export default CategoryLayout;
