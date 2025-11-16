import type { PropsWithChildren } from "react";
import { CategoryBottomButton, CategoryHeader } from "./src/ui";

const CategoryLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <CategoryHeader />
      {children}
      <CategoryBottomButton />
    </div>
  );
};

export default CategoryLayout;
