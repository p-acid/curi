import { Button } from "@/components";

export const MainImage = () => {
  return (
    <div className="box">
      <h2 className="heading-1">대표 이미지</h2>
      <div className="flex aspect-square flex-col items-center justify-center gap-6 rounded-lg border border-[#E5E5E5] bg-[#F7F7F8]">
        <div className="flex flex-col gap-2">
          <p className="whitespace-pre text-center font-bold text-[28px] max-mobile:text-xl">
            콘텐츠 대표 이미지를
            <br />
            등록해주세요!
          </p>
          <p className="font-medium text-[#8F8F8F] text-[22px] max-mobile:text-base">
            1:1 비율의 정사각형 이미지를 추천합니다
          </p>
        </div>
        <Button size="large" className="max-mobile:btn-medium w-40">
          이미지 업로드
        </Button>
      </div>
    </div>
  );
};
