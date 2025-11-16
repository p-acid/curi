import type { MouseEventHandler } from "react";
import X from "@/assets/icons/x.svg?component";
import { Button } from "@/components";
import { cn } from "@/utils/cn";

interface HeaderProps {
  title: string;
  nextDisabled?: boolean;
  onNext?: MouseEventHandler<HTMLButtonElement>;
  onExit?: MouseEventHandler<HTMLButtonElement>;
}

export const Header = ({
  title,
  nextDisabled = false,
  onNext,
  onExit,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 left-0 h-16 w-full border-[#D7D7D7] border-b bg-background max-mobile:h-12">
      <div
        className={cn(
          "mx-auto flex h-full w-full max-w-container items-center justify-end px-5 max-mobile:px-4 max-mobile:py-2",
          { "justify-between": onExit },
        )}
      >
        {onExit && (
          <>
            <Button
              className="w-[120px] max-mobile:hidden"
              size="small"
              color="primaryOutline"
              onClick={onExit}
            >
              나가기
            </Button>
            <button
              type="button"
              className="hidden max-mobile:inline-block"
              onClick={onExit}
            >
              <X className="size-7" />
            </button>
          </>
        )}
        <span className="-translate-x-[50%] absolute left-1/2 font-bold text-2xl max-mobile:text-lg">
          {title}
        </span>
        <Button
          color="primarySolid"
          className="w-[120px] max-mobile:hidden"
          size="small"
          disabled={nextDisabled}
          onClick={onNext}
        >
          다음으로
        </Button>
      </div>
    </header>
  );
};
