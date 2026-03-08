import { X } from "lucide-react";

interface ImagePreviewProps {
  file: File;
  previewUrl: string;
  onClear: () => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function ImagePreview({ file, previewUrl, onClear }: ImagePreviewProps) {
  return (
    <div className="relative rounded-xl overflow-hidden bg-neutral-800 border border-neutral-700">
      <img
        src={previewUrl}
        alt="Preview"
        className="w-full max-h-64 object-contain bg-neutral-950"
      />
      <div className="flex items-center justify-between px-3 py-2 bg-neutral-800/80">
        <div className="min-w-0">
          <p className="text-xs font-medium text-neutral-300 truncate">{file.name}</p>
          <p className="text-xs text-neutral-600">{formatBytes(file.size)}</p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="ml-3 p-1.5 rounded-lg text-neutral-500 hover:text-neutral-200 hover:bg-neutral-700 transition-colors shrink-0"
          aria-label="Remove image"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
