"use client";

import { Controller } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  defaultValue: string;
  control: any; /* eslint-disable-line */
  errors: any; /* eslint-disable-line */
}

export default function TextInput({
  label,
  name,
  defaultValue,
  control,
  errors,
}: Props) {
  const styleLabelText = `
    text-black
    font-bold
  `;

  const styleInput = `
    w-full
    border
  `;

  return (
    <>
      <div>
        <label className={styleLabelText}>
          {label}
        </label>
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => (
            <div className="text-black">
              <input className={styleInput} {...field} type={name} name={name} id={name} />
              {errors[field.name]?.message && (
                <p className="text-red-500">
                  {String(errors[field.name]?.message)}
                </p>
              )}
            </div>
          )}
        />
      </div>
    </>
  );
}
