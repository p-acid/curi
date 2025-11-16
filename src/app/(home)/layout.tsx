import type { PropsWithChildren } from "react";
import { BottomButton } from "@/layouts/bottom-button";
import { Header } from "@/layouts/header";

const NavigationLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header title="과제" />
      {children}
      <BottomButton>다음으로</BottomButton>
    </div>
  );
};

export default NavigationLayout;
