"use client";

import { useEffect, useRef, useState } from "react";
import ImagePlusIcon from "@/assets/icons/image-plus.svg?component";
import { processImageFile } from "@/libs/image-utils";
import { getImageFromDB, saveImageToDB } from "@/libs/indexed-db";
import { toast } from "@/libs/toast";
import { useCreateContentStore } from "@/store/use-create-content-store";

const MAX_ADDITIONAL_IMAGES = 4;
const ADDITIONAL_IMAGE_PREFIX = "additional-image-";

interface ImagePreview {
  id: string;
  dataUrl: string;
}

export const AdditionalImages = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const additionalImageIds = useCreateContentStore(
    (state) => state.additionalImageIds,
  );
  const addAdditionalImage = useCreateContentStore(
    (state) => state.addAdditionalImage,
  );

  useEffect(() => {
    const loadImages = async () => {
      const loadedPreviews: ImagePreview[] = [];

      for (const imageId of additionalImageIds) {
        try {
          const imageData = await getImageFromDB(imageId);
          if (imageData) {
            loadedPreviews.push({
              id: imageId,
              dataUrl: imageData.dataUrl,
            });
          }
        } catch (error) {
          console.error(`이미지 로드 실패 (${imageId}):`, error);
        }
      }

      setImagePreviews(loadedPreviews);
    };

    loadImages();
  }, [additionalImageIds]);

  const handleAddImageClick = () => {
    if (imagePreviews.length >= MAX_ADDITIONAL_IMAGES) {
      toast("최대 4장까지만 등록할 수 있습니다.");
      return;
    }
    setSelectedImageIndex(null);
    fileInputRef.current?.click();
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (selectedImageIndex === null) {
      if (imagePreviews.length >= MAX_ADDITIONAL_IMAGES) {
        toast("최대 4장까지만 등록할 수 있습니다.");
        event.target.value = "";
        return;
      }

      try {
        const { dataUrl, processedFile } = await processImageFile(file);

        const imageId = `${ADDITIONAL_IMAGE_PREFIX}${crypto.randomUUID()}`;

        await saveImageToDB(imageId, processedFile, dataUrl);

        setImagePreviews((prev) => [...prev, { id: imageId, dataUrl }]);
        addAdditionalImage(imageId);

        toast("이미지가 추가되었습니다.");
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        toast(
          error instanceof Error
            ? error.message
            : "이미지 업로드에 실패했습니다.",
        );
      } finally {
        event.target.value = "";
      }
    } else {
      try {
        const { dataUrl, processedFile } = await processImageFile(file);

        const targetImage = imagePreviews[selectedImageIndex];
        if (!targetImage) return;

        await saveImageToDB(targetImage.id, processedFile, dataUrl);

        setImagePreviews((prev) =>
          prev.map((img, idx) =>
            idx === selectedImageIndex ? { ...img, dataUrl } : img,
          ),
        );

        toast("이미지가 교체되었습니다.");
      } catch (error) {
        console.error("이미지 교체 실패:", error);
        toast(
          error instanceof Error
            ? error.message
            : "이미지 교체에 실패했습니다.",
        );
      } finally {
        event.target.value = "";
        setSelectedImageIndex(null);
      }
    }
  };

  const showAddButton = imagePreviews.length < MAX_ADDITIONAL_IMAGES;

  return (
    <div className="box max-mobile:px-0">
      <div className="space-y-2 max-mobile:px-4">
        <h2 className="heading-1">추가 이미지 (선택)</h2>
        <p className="title-1 text-[#767676]">최대 4장까지 등록할 수 있어요</p>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 max-mobile:flex max-mobile:overflow-x-auto max-mobile:px-4">
        {imagePreviews.map((preview, index) => (
          <div
            key={preview.id}
            onClick={() => handleImageClick(index)}
            className="aspect-square cursor-pointer overflow-hidden rounded-lg border border-[#E5E5E5] bg-[#F7F7F8] max-mobile:min-w-30"
          >
            <img
              src={preview.dataUrl}
              alt="추가 이미지"
              className="h-full w-full object-cover"
            />
          </div>
        ))}

        {showAddButton && (
          <div
            onClick={handleAddImageClick}
            className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border border-[#E5E5E5] bg-[#F7F7F8] max-mobile:min-w-30"
          >
            <ImagePlusIcon
              className="size-15 text-[#8F8F8F] max-mobile:size-8"
              width={60}
              height={60}
            />
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.png"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
