import React from "react";
import { Button } from "../ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog";
import { logout } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      alert("로그아웃되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <DialogRoot size={"sm"}>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"}>
          로그아웃
        </Button>
      </DialogTrigger>

      <DialogContent>
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
          {/* Dialog Body */}
          <DialogBody>
            <p className="text-gray-800 text-lg font-semibold">
              로그아웃 하시겠습니까?
            </p>
          </DialogBody>

          <DialogFooter>
            <div className="flex justify-end gap-3 mt-4">
              <DialogActionTrigger asChild>
                <Button
                  variant="outline"
                  className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
                >
                  아니오
                </Button>
              </DialogActionTrigger>
              <Button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
              >
                예
              </Button>
            </div>
          </DialogFooter>

          <DialogCloseTrigger />
        </div>
      </DialogContent>
    </DialogRoot>
  );
}
