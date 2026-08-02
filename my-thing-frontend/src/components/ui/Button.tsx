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

  // Define variant-specific styling configurations
  const variantStyles = {
    primary: "bg-[#4f46e5] hover:bg-[#4338ca] text-white shadow-md border-transparent",
    outline: "border border-[#4f46e5]/40 hover:border-[#4f46e5] hover:bg-indigo-50/50 text-[#4f46e5] bg-white",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700 border-transparent"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // Base layout, centering, and sizing styles
        "inline-flex items-center justify-center gap-2", // Flexbox centers content vertically and horizontally
        "w-full h-10 px-5", // Dynamic height (h-10 is 40px, great standard CTA size) and padding
        "text-xs font-semibold rounded-xl transition-all duration-200", 
        "disabled:opacity-50 disabled:cursor-not-allowed",
        
        // Dynamically inject variant styles
        variantStyles[variant], 
        
        // Custom parent styles can safely override the defaults
        className 
      )}
    >
      {children}
    </button>
  );
}