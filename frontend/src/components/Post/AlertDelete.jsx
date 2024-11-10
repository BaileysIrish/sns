import { Button } from "../ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
} from "../ui/dialog";

export default function AlertDelete({ onCancel, onDelete, open, setOpen }) {
  return (
    <DialogRoot
      size={"xs"}
      placement="center"
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DialogContent>
        <DialogBody p={0}>
          <div className="flex flex-col items-center w-[100%]">
            <p className="text-lg mt-5">게시물을 삭제하시겠습니까?</p>
            <p className="opacity-50 mb-5">
              지금 나가면 수정내용이 저장되지 않습니다.
            </p>
            <hr />
            <div className="flex flex-col items-center w-[100%] m-3">
              <Button
                className="text-red-600 font-semibold w-[100%] border-t border-gray-200"
                onClick={onDelete}
              >
                삭제
              </Button>
              <Button
                className="w-[100%] border-t border-gray-200"
                onClick={onCancel}
              >
                취소
              </Button>
            </div>
          </div>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
