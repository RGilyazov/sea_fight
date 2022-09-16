import React from "react";

export type ButtonProps = {
  caption: string;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
};

export default function Button(Props: ButtonProps) {
  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    Props.onClick(e);
  };

  return (
    <button
      className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase
         rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
          focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      onClick={handleClick}
    >
      {Props.caption}
    </button>
  );
}
