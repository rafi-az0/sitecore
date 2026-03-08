import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { useUpload } from "../../hooks/useUpload";
import { DropZone } from "./DropZone";
import { ImagePreview } from "./ImagePreview";
import { UploadForm } from "./UploadForm";
import type { Post } from "../../api/types";

interface UploadModalProps {
  onClose: () => void;
  onSuccess: (post: Post) => void;
}

export function UploadModal({ onClose, onSuccess }: UploadModalProps) {
  const handleSuccess = useCallback(
    (post: Post) => {
      onSuccess(post);
      onClose();
    },
    [onClose, onSuccess],
  );

  const {
    file,
    previewUrl,
    caption,
    setCaption,
    author,
    setAuthor,
    isUploading,
    validationError,
    submitError,
    selectFile,
    clearFile,
    submit,
    reset,
  } = useUpload(handleSuccess);

  // Close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isUploading) {
        onClose();
        reset();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isUploading, onClose, reset]);

  const handleBackdrop = () => {
    if (!isUploading) {
      onClose();
      reset();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="New post"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
        onClick={handleBackdrop}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-[fadeSlideUp_0.2s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
          <h2 className="text-base font-semibold text-neutral-50">New Post</h2>
          <button
            type="button"
            onClick={() => {
              if (!isUploading) {
                onClose();
                reset();
              }
            }}
            className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
            disabled={isUploading}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          {!file ? (
            <DropZone onFile={selectFile} error={validationError} />
          ) : (
            <>
              {previewUrl && (
                <ImagePreview file={file} previewUrl={previewUrl} onClear={clearFile} />
              )}
              <UploadForm
                author={author}
                setAuthor={setAuthor}
                caption={caption}
                setCaption={setCaption}
                onSubmit={submit}
                isUploading={isUploading}
                submitError={submitError}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
