import { request } from "./client";
import type { PaginatedPosts, Post } from "./types";

export function fetchPosts(cursor?: string, limit = 12): Promise<PaginatedPosts> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("cursor", cursor);
  return request<PaginatedPosts>(`/api/posts?${params}`);
}

export function fetchPost(id: string): Promise<Post> {
  return request<Post>(`/api/posts/${id}`);
}

export function createPost(data: { caption: string; author: string; image: File }): Promise<Post> {
  const form = new FormData();
  form.append("caption", data.caption);
  form.append("author", data.author);
  form.append("image", data.image);
  return request<Post>("/api/posts", { method: "POST", body: form });
}
