const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE_BYTES = 1 * 1024 * 1024; // 1 MB

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Unsupported format. Use JPEG, PNG, GIF, or WebP.";
  }
  if (file.size > MAX_SIZE_BYTES) {
    return "Image is too large. Maximum size is 1 MB.";
  }
  return null;
}
