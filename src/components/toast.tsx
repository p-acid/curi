import type { PropsWithChildren } from "react";

export const Toast = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-[580px] rounded-lg bg-[#323232] p-3 text-center text-white max-mobile:w-full">
      {children}
    </div>
  );
};
