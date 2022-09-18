import React from "react";

export type ButtonProps = {
  caption: string;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

export default function Button(props: ButtonProps) {
  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    if (!props.disabled) props.onClick(e);
  };

  return (
    <button
      disabled={props.disabled === true}
      className="px-6 py-2.5 bg-blue-600 disabled:bg-gray-400 text-white font-medium text-xs leading-tight uppercase
         rounded shadow-xl hover:bg-blue-700  focus:bg-blue-700 focus:shadow-lg 
          focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      onClick={handleClick}
    >
      {props.caption}
    </button>
  );
}
