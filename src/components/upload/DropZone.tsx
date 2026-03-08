import { useCallback, useState, useRef } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "../../utils/cn";

type DropState = "idle" | "over" | "rejected" | "error";

interface DropZoneProps {
  onFile: (file: File) => void;
  error?: string | null;
}

export function DropZone({ onFile, error }: DropZoneProps) {
  const [dropState, setDropState] = useState<DropState>(error ? "error" : "idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0]!;
      onFile(file);
    },
    [onFile],
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const hasFiles = Array.from(e.dataTransfer.types).includes("Files");
    setDropState(hasFiles ? "over" : "rejected");
  };

  const onDragLeave = () => setDropState(error ? "error" : "idle");

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDropState("idle");
    handleFiles(e.dataTransfer.files);
  };

  const onClick = () => inputRef.current?.click();

  const stateClasses: Record<DropState, string> = {
    idle: "border-neutral-700 hover:border-violet-500 hover:bg-neutral-800/50",
    over: "border-violet-500 bg-violet-950/30",
    rejected: "border-red-600 bg-red-950/20",
    error: "border-red-500 bg-red-950/20",
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className={cn(
          "w-full rounded-xl border-2 border-dashed p-10 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
          stateClasses[error ? "error" : dropState],
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={onClick}
        aria-label="Upload image"
      >
        <UploadCloud
          className={cn("h-10 w-10", {
            "text-violet-500": dropState === "over",
            "text-red-400": dropState === "rejected" || error,
            "text-neutral-500": dropState === "idle" && !error,
          })}
        />
        <div className="text-center">
          <p className="text-sm font-medium text-neutral-300">Drag & drop or click to browse</p>
          <p className="text-xs text-neutral-600 mt-1">JPEG, PNG, GIF, WebP · max 1 MB</p>
        </div>
      </button>

      {error && <p className="text-sm text-red-400 flex items-center gap-1.5 px-1">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
