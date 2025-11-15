import Link from "next/link";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg?component";
import ImagePlusIcon from "@/assets/icons/image-plus.svg?component";
import { Button } from "@/components/button";
import { Textarea } from "@/components/textarea";
import { PAGE_ROUTES } from "@/config";

const HomePage = () => {
  return (
    <main className="content flex gap-10 max-mobile:flex-col max-mobile:gap-0">
      <section className="flex-1">
        <div className="box">
          <h3 className="heading-1">대표 이미지</h3>
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

        <div className="box">
          <div className="space-y-2">
            <h3 className="heading-1">추가 이미지 (선택)</h3>
            <p className="title-1 text-[#767676]">
              최대 4장까지 등록할 수 있어요
            </p>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border border-[#E5E5E5] bg-[#F7F7F8]">
              <ImagePlusIcon
                className="size-15 text-[#8F8F8F] max-mobile:size-8"
                width={60}
                height={60}
              />
              <input id="file" type="file" className="sr-only" />
            </label>
          </div>
        </div>
      </section>
      <section className="flex-1">
        <div className="box">
          <h3 className="heading-1">카테고리</h3>
          <Link
            href={PAGE_ROUTES.CATEGORY}
            className="flex items-center justify-between gap-1 rounded-lg border border-[#E5E5E5] bg-background p-4 max-mobile:py-3"
          >
            <span className="font-medium text-[#8F8F8F] text-lg max-mobile:text-base">
              주제를 선정해주세요
            </span>
            <ChevronRightIcon className="size-7 text-foreground max-mobile:size-6" />
          </Link>
        </div>

        <div className="box">
          <h3 className="heading-1">콘텐츠 제목</h3>
          <Textarea
            placeholder="제목을 입력해주세요"
            minLength={8}
            maxLength={80}
          />
        </div>

        <div className="box">
          <div className="space-y-2">
            <h3 className="heading-1">활동 방식 선택</h3>
            <p className="title-1 text-[#767676]">
              만남을 어떤 방식으로 진행하시겠어요?
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              color="primaryOutline"
              size="large"
              className="max-mobile:btn-medium w-full"
            >
              온라인
            </Button>
            <Button
              color="primaryOutline"
              size="large"
              className="max-mobile:btn-medium w-full"
            >
              직접 만나기
            </Button>
          </div>
        </div>

        <div className="box">
          <h3 className="heading-1">상세 정보</h3>
          <div className="flex flex-col gap-8 rounded-lg bg-[#F7F7F8] px-5 py-7">
            <div className="space-y-4">
              <p className="heading-2">회차 정보</p>
              <div className="space-y-3">
                <div className="flex items-center gap-6 max-mobile:gap-4">
                  <span className="whitespace-pre font-semibold text-[#565656] text-lg max-mobile:text-base">
                    날짜 선택
                  </span>
                  <button
                    type="button"
                    className="flex h-15 w-full items-center justify-center rounded-lg border border-[#E5E5E5] bg-background max-mobile:h-13"
                  >
                    <p className="text-[#8F8F8F] text-xl max-mobile:text-base">
                      날짜를 선택해주세요
                    </p>
                  </button>
                </div>

                <div className="flex items-center gap-6 max-mobile:gap-4">
                  <span className="whitespace-pre font-semibold text-[#565656] text-lg max-mobile:text-base">
                    시작 시간
                  </span>
                  <div className="flex h-15 w-full items-center justify-center rounded-lg border border-[#E5E5E5] bg-background max-mobile:h-13">
                    <div className="flex min-w-20 items-center justify-center max-mobile:min-w-16">
                      <Button
                        color="primaryOutline"
                        size="small"
                        className="max-mobile:px-2"
                      >
                        오전
                      </Button>
                    </div>
                    <input className="w-full text-center font-medium text-xl outline-none max-mobile:text-lg" />
                    <span className="font-medium text-lg">:</span>
                    <input className="w-full text-center font-medium text-xl outline-none max-mobile:text-lg" />
                  </div>
                </div>

                <div className="flex items-center gap-6 max-mobile:gap-4">
                  <span className="whitespace-pre font-semibold text-[#565656] text-lg max-mobile:text-base">
                    종료 시간
                  </span>
                  <div className="flex h-15 w-full items-center justify-center rounded-lg border border-[#E5E5E5] bg-background max-mobile:h-13">
                    <div className="flex min-w-20 items-center justify-center max-mobile:min-w-16">
                      <Button
                        color="primaryOutline"
                        size="small"
                        className="max-mobile:px-2"
                      >
                        오전
                      </Button>
                    </div>
                    <input className="w-full text-center font-medium text-xl outline-none max-mobile:text-lg" />
                    <span className="font-medium text-lg">:</span>
                    <input className="w-full text-center font-medium text-xl outline-none max-mobile:text-lg" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="heading-2">활동 내용</p>
                <p className="title-2 text-[#767676]">
                  날짜별 활동 내용을 간단히 적어주세요
                </p>
              </div>
              <Textarea
                placeholder="활동 내용을 간단히 입력해주세요"
                minLength={8}
                maxLength={800}
              />
            </div>
          </div>
        </div>

        <div className="pt-6 max-mobile:px-4">
          <Button size="large" className="max-mobile:btn-medium w-full">
            회차 추가하기
          </Button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
