import { Button, Modal, type ModalProps } from "@/components";

interface SessionDeleteModalProps extends ModalProps {
  onDelete: () => void;
}

export const SessionDeleteModal = ({
  onClose,
  onDelete,
  ...props
}: SessionDeleteModalProps) => {
  return (
    <Modal
      className="flex flex-col gap-8 px-6 pt-14 pb-6"
      onClose={onClose}
      {...props}
    >
      <div className="space-y-2">
        <p className="text-center font-bold text-2xl max-mobile:text-xl">
          {"작성된 내용을 "}
          <br className="max-mobile:hidden" />
          삭제하시겠어요?
        </p>
        <p className="text-center font-medium text-[#565656] text-lg max-mobile:text-base">
          삭제한 내용은 복구할 수 없습니다.
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          className="max-mobile:btn-medium w-full"
          size="large"
          color="primaryOutline"
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          className="max-mobile:btn-medium w-full"
          size="large"
          color="graySolid"
          onClick={onDelete}
        >
          삭제하기
        </Button>
      </div>
    </Modal>
  );
};
