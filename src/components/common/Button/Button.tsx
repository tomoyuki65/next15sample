"use client";

interface Props {
  text: string;
  onClick: () => void;
}

export default function Button({
  text,
  onClick,
}: Props) {
  const style = `
    w-fit
    bg-green-700
    rounded-md
    px-1
    py-0.5
  `;

  return (
    <>
      <div className={style}>
        <button onClick={onClick}>
          {text}
        </button>
      </div>
    </>
  );
}
