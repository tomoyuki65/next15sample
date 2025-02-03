"use client";

import Button from "@/components/common/Button/Button";
import TextInput from "@/components/common/TextInput/TextInput";
// import { useStateContext } from "@/contexts/common/StateContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
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
  const [disabled, setDisabled] = useState(false);
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
    watch,
  } = useForm(formOptions);

  // バリデーションチェックで正常時
  const onSubmit: SubmitHandler<FormData> = async (
    data: FormData,
  ) => {
    setDisabled(false);
    console.log("バリデーションチェックOK！", data);
  };

  // バリデーションチェックでエラー時
  const onError: SubmitErrorHandler<FormData> = async (
    errors: FieldErrors<FormData>,
  ) => {
    setDisabled(true);
    console.log("バリデーションチェックでエラー");
    console.log(errors);
  };

  const submit = async () => {
    const values = getValues();
    setEmail(values.email);
    setPassword(values.password);
    handleSubmit(onSubmit, onError)();
  };

  // フォームの状態値
  const watchedValues = watch();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [watchedValues]);

  return (
    <>
      <h1>Mock Form Component !!</h1>
      <div className="w-[300px] bg-white rounded p-1 m-1">
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
      </div>
      <br />
      <div className="p-1 m-1">
        <Button text={"Submit"} onClick={submit} disabled={disabled} />
      </div>
    </>
  );
}
