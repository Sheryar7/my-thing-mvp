import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
}

export default function Button({ 
  children, 
  onClick, 
  type = "button", 
  disabled = false, 
  className,
  variant = "primary"
}: ButtonProps) {

  // Standardized Tailwind classes allow parent component overrides
  const variantStyles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md border-transparent",
    outline: "border border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50/50 text-indigo-600 bg-white",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700 border-transparent"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "w-full h-10 px-5",
        "text-xs font-semibold rounded-xl transition-all duration-200", 
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant], 
        className 
      )}
    >
      {children}
    </button>
  );
}