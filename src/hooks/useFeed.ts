import { useState, useCallback, useEffect, useRef } from "react";
import { fetchPosts } from "../api/posts";
import type { Post } from "../api/types";

interface FeedState {
  posts: Post[];
  cursor: string | null;
  hasMore: boolean;
  isLoading: boolean;
  isInitialLoad: boolean;
  error: unknown;
}

export function useFeed() {
  const [state, setState] = useState<FeedState>({
    posts: [],
    cursor: null,
    hasMore: true,
    isLoading: false,
    isInitialLoad: true,
    error: null,
  });

  // Use a ref so loadMore always has the latest state without needing it in deps
  const stateRef = useRef(state);
  stateRef.current = state;

  const loadMore = useCallback(async () => {
    const { isLoading, hasMore, cursor } = stateRef.current;
    if (isLoading || !hasMore) return;

    setState((s) => ({ ...s, isLoading: true, error: null }));

    try {
      const data = await fetchPosts(cursor ?? undefined);
      setState((s) => ({
        ...s,
        posts: [...s.posts, ...data.items],
        cursor: data.nextCursor,
        hasMore: data.hasMore,
        isLoading: false,
        isInitialLoad: false,
      }));
    } catch (err) {
      setState((s) => ({
        ...s,
        isLoading: false,
        isInitialLoad: false,
        error: err,
      }));
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadMore();
  }, [loadMore]);

  const onPostCreated = useCallback((post: Post) => {
    setState((s) => ({ ...s, posts: [post, ...s.posts] }));
  }, []);

  const retry = useCallback(() => {
    setState((s) => ({ ...s, error: null, isInitialLoad: s.posts.length === 0, hasMore: true }));
    // Small timeout to let state settle before retry
    setTimeout(() => loadMore(), 0);
  }, [loadMore]);

  return { ...state, loadMore, onPostCreated, retry };
}
