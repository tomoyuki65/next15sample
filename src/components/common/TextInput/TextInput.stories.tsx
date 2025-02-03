import type { Meta, StoryObj } from "@storybook/react";

import TextInput from "@/components/common/TextInput/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

type FormData = {
  email: string;
  // password: string;
};

const meta = {
  title: "Common/TextInput",
  component: TextInput,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  render: (args: any) => {
    const [disabled, setDisabled] = useState(false); /* eslint-disable-line react-hooks/rules-of-hooks */

    // バリデーションの設定
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .required("メールアドレスを入力して下さい。")
        .email("メールアドレスは有効なアドレス形式で入力して下さい。"),
      // password: Yup.string()
      //   .required("パスワードを入力して下さい。")
      //   .matches(/^[0-9a-zA-Z]+$/, "パスワードは半角英数字で入力して下さい。")
      //   .min(6, "パスワードは6文字以上で入力して下さい。"),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const {
      control,
      handleSubmit,
      formState: { errors },
      watch,
    } = useForm(formOptions); /* eslint-disable-line react-hooks/rules-of-hooks */

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
      console.log("バリデーションチェックでエラー", errors);
    };

    const submit = () => {
      handleSubmit(onSubmit, onError)();
    };

    // フォームの状態値
    const watchedValues = watch();

    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    useEffect(() => {
      if (Object.keys(errors).length > 0) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [watchedValues]);

    const styleButton = `
      border
      rounded
      ${!disabled ? "bg-green-500" : "bg-gray-300"}
    `;

    return (
      <div className="w-[300px]">
        <TextInput
          label={args.label}
          name={args.name}
          defaultValue={args.defaultValue}
          control={control}
          errors={errors}
        />
        <br />
        <br />
        <button className={styleButton} onClick={!disabled ? submit : () => {}}>
          Submit
        </button>
      </div>
    );
  },
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [
        {
          name: "white",
          value: "#FFFFFF",
        },
      ],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Email",
    name: "email",
    defaultValue: "",
    control: {},
    errors: {},
  },
};
