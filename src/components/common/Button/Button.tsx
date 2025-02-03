"use client";

interface Props {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

export default function Button({
  text,
  onClick,
  disabled,
}: Props) {
  const style = `
    w-fit
    ${!disabled ? "bg-green-700" : "bg-gray-300"}
    rounded-md
    px-1
    py-0.5
  `;

  return (
    <>
      <div className={style}>
        <button onClick={!disabled ? onClick : () => {}}>
          {text}
        </button>
      </div>
    </>
  );
}
