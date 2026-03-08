import { useState, useEffect, useCallback } from "react";
import { createPost } from "../api/posts";
import { validateImageFile } from "../utils/fileValidation";
import { getErrorMessage } from "../utils/errorMessages";
import type { Post } from "../api/types";

export function useUpload(onSuccess: (post: Post) => void) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [author, setAuthor] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Manage preview URL lifecycle
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const selectFile = useCallback((f: File) => {
    const err = validateImageFile(f);
    if (err) {
      setValidationError(err);
      setFile(null);
      return;
    }
    setValidationError(null);
    setSubmitError(null);
    setFile(f);
  }, []);

  const clearFile = useCallback(() => {
    setFile(null);
    setValidationError(null);
    setSubmitError(null);
  }, []);

  const submit = useCallback(async () => {
    if (!file || !author.trim()) return;
    setIsUploading(true);
    setSubmitError(null);

    try {
      const post = await createPost({ caption, author: author.trim(), image: file });
      setIsSuccess(true);
      onSuccess(post);
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setIsUploading(false);
    }
  }, [file, author, caption, onSuccess]);

  const reset = useCallback(() => {
    setFile(null);
    setCaption("");
    setAuthor("");
    setIsUploading(false);
    setValidationError(null);
    setSubmitError(null);
    setIsSuccess(false);
  }, []);

  return {
    file,
    previewUrl,
    caption,
    setCaption,
    author,
    setAuthor,
    isUploading,
    validationError,
    submitError,
    isSuccess,
    selectFile,
    clearFile,
    submit,
    reset,
  };
}
