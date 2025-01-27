"use client";

import Button from "@/components/common/Button/Button";
import { toast } from "react-toastify";

export default function Mock() {
  const onClick = () => {
    toast.success("メッセージテスト！！");
    console.log("ボタンをクリックしました！");
  };
  return (
    <>
      <h1>Mock Component !!</h1>
      <Button text={"ボタン"} onClick={onClick} />
    </>
  );
}
