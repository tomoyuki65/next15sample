"use client";

import Button from "@/components/common/Button/Button";
import { useStateContext } from "@/contexts/common/StateContext";
import { toast } from "react-toastify";

export default function Mock() {
  const {
    windowSize,
    isLoding,
    isLogin,
    token,
  } = useStateContext();

  const onClick = () => {
    toast.success("メッセージテスト！！");
    console.log("ボタンをクリックしました！");
  };

  return (
    <>
      <h1>Mock Component !!</h1>
      <p>width: {windowSize.width}</p>
      <p>height: {windowSize.height}</p>
      <p>isLoding: {String(isLoding)}</p>
      <p>isLogin: {String(isLogin)}</p>
      <p>token: {token}</p>
      <br />
      <Button text={"ボタン"} onClick={onClick} />
    </>
  );
}
