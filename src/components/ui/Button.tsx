import { cn } from "../../utils/cn";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed",
        {
          primary: "bg-violet-500 text-white hover:bg-violet-600 active:bg-violet-700",
          ghost: "bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-neutral-50",
          icon: "bg-transparent text-neutral-400 hover:text-neutral-50 hover:bg-neutral-800 p-2 rounded-lg",
        }[variant],
        {
          sm: "px-3 py-1.5 text-sm",
          md: "px-4 py-2 text-sm",
          lg: "px-5 py-2.5 text-base",
        }[size],
        variant === "icon" && "px-2 py-2",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
