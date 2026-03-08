import { ApiException } from "./types";

const API_URL = import.meta.env.VITE_API_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "x-api-key": API_KEY,
    ...(init.headers as Record<string, string> | undefined),
  };

  // Don't set Content-Type for FormData — browser sets it with boundary
  if (!(init.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, { ...init, headers });
  } catch {
    throw new ApiException(0, "NETWORK_ERROR", "Network request failed");
  }

  if (!response.ok) {
    let code = "UNKNOWN";
    let message = response.statusText;
    try {
      const body = await response.json();
      code = body.code ?? code;
      message = body.message ?? message;
    } catch {
      // ignore JSON parse errors
    }
    throw new ApiException(response.status, code, message);
  }

  return response.json() as Promise<T>;
}
