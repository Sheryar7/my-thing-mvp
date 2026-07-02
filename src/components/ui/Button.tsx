import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export default function Button({ 
  children, 
  onClick, 
  type = "button", 
  disabled = false, 
  className 
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full h-[36px] bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-semibold rounded-xl transition-all shadow-md",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className // This allows you to pass custom styles from the parent
      )}
    >
      {children}
    </button>
  );
}