import { createContext, useContext } from "react";
import type { Post } from "../api/types";
import type { SortOrder } from "./useFeed";

interface FeedContextValue {
  posts: Post[];
  isLoading: boolean;
  isInitialLoad: boolean;
  hasMore: boolean;
  error: unknown;
  sortOrder: SortOrder;
  loadMore: () => void;
  onPostCreated: (post: Post) => void;
  setSortOrder: (order: SortOrder) => void;
  retry: () => void;
}

export const FeedContext = createContext<FeedContextValue | null>(null);

export function useFeedContext() {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error("useFeedContext must be used within FeedContext.Provider");
  return ctx;
}
