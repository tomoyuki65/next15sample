"use client";

import Button from "@/components/common/Button/Button";
import TextInput from "@/components/common/TextInput/TextInput";
// import { useStateContext } from "@/contexts/common/StateContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

type FormData = {
  email: string;
  password: string;
};

export default function MockForm() {
  // const {
  //   windowSize,
  //   isLoding,
  //   isLogin,
  //   token,
  // } = useStateContext();

  // フォーム
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isHoverd, setIsHoverd] = useState(false);

  // バリデーションの設定
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("メールアドレスを入力して下さい。")
      .email("メールアドレスは有効なアドレス形式で入力して下さい。"),
    password: Yup.string()
      .required("パスワードを入力して下さい。")
      .matches(/^[0-9a-zA-Z]+$/, "パスワードは半角英数字で入力して下さい。")
      .min(6, "パスワードは6文字以上で入力して下さい。"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm(formOptions);

  // バリデーションチェックで正常時
  const onSubmit: SubmitHandler<FormData> = async (
    data: FormData,
  ) => {
    console.log("バリデーションチェックOK！", data);
  };

  // バリデーションチェックでエラー時
  const onError: SubmitErrorHandler<FormData> = async (
    errors: FieldErrors<FormData>,
  ) => {
    console.log("バリデーションチェックでエラー");
    console.log(errors);
  };

  const submit = async () => {
    const values = getValues();
    setEmail(values.email);
    setPassword(values.password);
    handleSubmit(onSubmit, onError)();
  };

  return (
    <>
      <h1>Mock Form Component !!</h1>
      <div>
        <TextInput
          label={"Email"}
          name={"email"}
          defaultValue={email}
          control={control}
          errors={errors}
        />
      </div>
      <div>
        <TextInput
          label={"Password"}
          name={"password"}
          defaultValue={password}
          control={control}
          errors={errors}
        />
      </div>
      <br />
      <div>
        <Button text={"Submitボタン"} onClick={submit} />
      </div>
    </>
  );
}
