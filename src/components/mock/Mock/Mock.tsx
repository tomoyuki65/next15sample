"use client";

import Button from "@/components/common/Button/Button";

export default function Mock() {
  const onClick = () => {
    console.log("ボタンをクリックしました！")
  }
  return (
    <>
      <h1>Mock Component !!</h1>
      <Button text={"ボタン"} onClick={onClick}/>
    </>
  );
}
