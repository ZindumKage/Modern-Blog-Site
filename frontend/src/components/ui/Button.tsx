import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button
    {...props}
    className={clsx(
      "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium",
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300",
      className
    )}
  >
    {children}
  </button>
);

export default Button;