import type { PropsWithChildren } from "react";
import { HomeBottomButton, HomeHeader } from "./src/ui";

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <HomeHeader />
      {children}
      <HomeBottomButton />
    </div>
  );
};

export default HomeLayout;
