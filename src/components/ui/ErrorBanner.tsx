import { AlertTriangle } from "lucide-react";
import { cn } from "../../utils/cn";

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorBanner({ message, onRetry, className }: ErrorBannerProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg bg-red-950/50 border border-red-800/50 px-4 py-3",
        className,
      )}
      role="alert"
    >
      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
      <p className="text-sm text-red-300 flex-1">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm text-red-400 underline hover:text-red-300 shrink-0"
        >
          Retry
        </button>
      )}
    </div>
  );
}
