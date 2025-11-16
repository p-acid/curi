"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components";
import { processImageFile } from "@/libs/image-utils";
import { getImageFromDB, saveImageToDB } from "@/libs/indexed-db";
import { toast } from "@/libs/toast";
import { useCreateContentStore } from "@/store/use-create-content-store";

const MAIN_IMAGE_ID = "main-image";

export const MainImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mainImageId = useCreateContentStore((state) => state.mainImageId);
  const setMainImage = useCreateContentStore((state) => state.setMainImage);

  useEffect(() => {
    const loadImage = async () => {
      if (mainImageId) {
        try {
          const imageData = await getImageFromDB(MAIN_IMAGE_ID);
          if (imageData) {
            setImagePreview(imageData.dataUrl);
          }
        } catch (error) {
          console.error("이미지 로드 실패:", error);
        }
      }
    };

    loadImage();
  }, [mainImageId]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    try {
      const { dataUrl, processedFile } = await processImageFile(file);

      await saveImageToDB(MAIN_IMAGE_ID, processedFile, dataUrl);

      setImagePreview(dataUrl);
      setMainImage(MAIN_IMAGE_ID);

      toast("이미지가 업로드되었습니다.");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      toast(
        error instanceof Error
          ? error.message
          : "이미지 업로드에 실패했습니다.",
      );
    } finally {
      setIsLoading(false);

      event.target.value = "";
    }
  };

  return (
    <div className="box">
      <h2 className="heading-1">대표 이미지</h2>
      <div
        className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-6 overflow-hidden rounded-lg border border-[#E5E5E5] bg-[#F7F7F8]"
        onClick={handleImageClick}
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="대표 이미지"
            className="h-full w-full object-cover"
          />
        ) : (
          <>
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
            <Button
              size="large"
              className="max-mobile:btn-medium pointer-events-none w-40"
              disabled={isLoading}
            >
              {isLoading ? "업로드 중..." : "이미지 업로드"}
            </Button>
          </>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
