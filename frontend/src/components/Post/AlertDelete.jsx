import { Button } from "../ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
} from "../ui/dialog";

export default function AlertDelete({
  onCancel,
  onDelete,
  open,
  setOpen,
  onEdit,
  trigger, // trigger: "backArrow" | "cancelEdit" | null
  isEditMode,
}) {
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
            {isEditMode && trigger === "cancelEdit" ? ( // 수정모드 + 밖을 클릭
              <>
                <p className="text-lg mt-5">수정 내용을 취소하시겠습니까?</p>
                <p className="opacity-50 mb-5">
                  지금 나가면 수정 내용이 저장되지 않습니다.
                </p>
              </>
            ) : (
              // 삭제 메시지 (기본모드 + 수정모드에서 뒤로가기 포함)
              <>
                <p className="text-lg mt-5">게시물을 삭제하시겠습니까?</p>
                <p className="opacity-50 mb-5">
                  삭제된 게시물은 복구할 수 없습니다.
                </p>
              </>
            )}
            <hr />
            <div className="flex flex-col items-center w-[100%] m-3">
              {isEditMode && trigger === "cancelEdit" ? ( // 수정모드 + 밖을 클릭
                <>
                  <Button
                    className="text-blue-600 font-semibold w-[100%] border-t border-gray-200"
                    onClick={onEdit} // "예" 버튼: 수정 취소
                  >
                    예
                  </Button>
                  <Button
                    className="w-[100%] border-t border-gray-200"
                    onClick={onCancel} // "아니오" 버튼
                  >
                    아니오
                  </Button>
                </>
              ) : (
                // 삭제 버튼 (뒤로가기 포함 모든 삭제 모드)
                <>
                  <Button
                    className="text-red-600 font-semibold w-[100%] border-t border-gray-200"
                    onClick={onDelete} // "삭제" 버튼
                  >
                    삭제
                  </Button>
                  <Button
                    className="w-[100%] border-t border-gray-200"
                    onClick={onCancel} // "취소" 버튼
                  >
                    취소
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
