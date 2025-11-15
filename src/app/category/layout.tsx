"use client";

import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { PAGE_ROUTES } from "@/config";
import { BottomButton } from "@/layouts/bottom-button";
import { Header } from "@/layouts/header";

const CategoryLayout = ({ children }: PropsWithChildren) => {
  const { push } = useRouter();

  return (
    <div>
      <Header title="카테고리" onExit={() => push(PAGE_ROUTES.ROOT)} />
      {children}
      <BottomButton>다음으로</BottomButton>
    </div>
  );
};

export default CategoryLayout;
