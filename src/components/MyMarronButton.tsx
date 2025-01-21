import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const   MyMarronButton: React.FC<ButtonProps> = ({
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
      className={`w-full px-4 py-3 bg-myMarron text-neutral-50 rounded-full hover:bg-myYellow focus:bg-myMarron transition-transform transform hover:scale-105 duration-300 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default MyMarronButton;
