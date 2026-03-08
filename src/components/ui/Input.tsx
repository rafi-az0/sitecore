import { cn } from "../../utils/cn";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-neutral-300">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-50 placeholder-neutral-500 transition-colors focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500",
          error && "border-red-400 focus:border-red-400 focus:ring-red-400",
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
