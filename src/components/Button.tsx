import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "deactivated" | "danger";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = "secondary",
  size = "md",
  onClick,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "px-8 py-4 rounded-lg font-inter font-semibold text-[18px] leading-[20px] transition-colors shadow-[0_4px_4px_0_rgba(79,70,229,0.2)]";

  const variants = {
    primary:
      "bg-gradient-to-b from-[#4F46E5] to-[#4F46E599] text-background hover:to-[#4F46E5]",
    secondary:
      "bg-gradient-to-b from-[#F59E0B] to-[#F59E0B99] text-background hover:to-[#F59E0B]",
    deactivated: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "",
    md: "",
    lg: "h-[75px] h2 w-full",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
