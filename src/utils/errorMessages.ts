import { ApiException } from "../api/types";

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiException) {
    switch (error.status) {
      case 0:
        return "Unable to connect. Check your internet connection.";
      case 413:
        return "Image is too large. Maximum size is 1 MB.";
      case 415:
        return "Unsupported format. Use JPEG, PNG, GIF, or WebP.";
      case 404:
        return "This post doesn't exist or was removed.";
      case 429:
        return "Too many requests. Please wait a moment.";
      default:
        if (error.status >= 500) return "Server error. Please try again.";
        return error.message || "An unexpected error occurred.";
    }
  }
  if (error instanceof Error) {
    if (error.message.includes("fetch") || error.message.includes("network")) {
      return "Unable to connect. Check your internet connection.";
    }
    return error.message;
  }
  return "An unexpected error occurred.";
}
