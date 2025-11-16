import ImagePlusIcon from "@/assets/icons/image-plus.svg?component";

export const AdditionalImages = () => {
  return (
    <div className="box">
      <div className="space-y-2">
        <h2 className="heading-1">추가 이미지 (선택)</h2>
        <p className="title-1 text-[#767676]">최대 4장까지 등록할 수 있어요</p>
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
  );
};
