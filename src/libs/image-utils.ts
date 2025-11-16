const MAX_FILE_SIZE = 15 * 1024 * 1024;

export const validateImageFile = (file: File): string | null => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!validTypes.includes(file.type)) {
    return "JPG 또는 PNG 파일만 업로드 가능합니다.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "파일 크기는 15MB 이하여야 합니다.";
  }

  return null;
};

export const convertImageToSquare = (
  file: File,
): Promise<{ dataUrl: string; blob: Blob }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const size = Math.min(img.width, img.height);

        const startX = (img.width - size) / 2;
        const startY = (img.height - size) / 2;

        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context를 가져올 수 없습니다."));
          return;
        }

        ctx.drawImage(img, startX, startY, size, size, 0, 0, size, size);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("이미지 변환에 실패했습니다."));
              return;
            }

            const dataUrl = canvas.toDataURL(file.type);
            resolve({ dataUrl, blob });
          },
          file.type,
          0.95,
        );
      };

      img.onerror = () => reject(new Error("이미지를 로드할 수 없습니다."));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error("파일을 읽을 수 없습니다."));
    reader.readAsDataURL(file);
  });
};

export const processImageFile = async (
  file: File,
): Promise<{ dataUrl: string; processedFile: File }> => {
  const error = validateImageFile(file);
  if (error) {
    throw new Error(error);
  }

  const { dataUrl, blob } = await convertImageToSquare(file);

  const processedFile = new File([blob], file.name, {
    type: file.type,
    lastModified: Date.now(),
  });

  return { dataUrl, processedFile };
};
