import { Button, type ButtonProps } from "@/components";

export const BottomButton = (props: ButtonProps) => {
  return (
    <div className="fixed bottom-0 hidden w-full border-[#E5E5E5] border-t bg-background px-4 pt-2 pb-4 max-mobile:block">
      <Button color="primarySolid" className="w-full" {...props} />
    </div>
  );
};
