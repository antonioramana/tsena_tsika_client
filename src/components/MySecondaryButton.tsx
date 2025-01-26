import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const MySecondaryButton: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full px-4 py-3 bg-gray-400 text-neutral-50 rounded-full hover:bg-gray-500 focus:bg-gray-400 transition-transform transform hover:scale-105 duration-300 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default MySecondaryButton;
