import { request } from "./client";
import type { CommentsResponse } from "./types";

export function fetchComments(postId: string): Promise<CommentsResponse> {
  return request<CommentsResponse>(`/api/comments/${postId}`);
}
