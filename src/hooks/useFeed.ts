import { useState, useCallback, useEffect, useRef } from "react";
import { fetchPosts } from "../api/posts";
import type { Post } from "../api/types";

export type SortOrder = "newest" | "oldest";

function applySortOrder(posts: Post[], order: SortOrder): Post[] {
  return [...posts].sort((a, b) => {
    const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return order === "newest" ? -diff : diff;
  });
}

interface FeedState {
  posts: Post[];
  cursor: string | null;
  hasMore: boolean;
  isLoading: boolean;
  isInitialLoad: boolean;
  error: unknown;
  sortOrder: SortOrder;
}

export function useFeed() {
  const [state, setState] = useState<FeedState>({
    posts: [],
    cursor: null,
    hasMore: true,
    isLoading: false,
    isInitialLoad: true,
    error: null,
    sortOrder: "newest",
  });

  // Synchronous guard — prevents a second loadMore from slipping past the
  // isLoading check before the first one's setState has re-rendered.
  const isLoadingRef = useRef(false);
  const stateRef = useRef(state);
  stateRef.current = state;

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !stateRef.current.hasMore) return;
    isLoadingRef.current = true;

    setState((s) => ({ ...s, isLoading: true, error: null }));

    try {
      const data = await fetchPosts(stateRef.current.cursor ?? undefined);
      setState((s) => ({
        ...s,
        posts: applySortOrder([...s.posts, ...data.items], s.sortOrder),
        cursor: data.nextCursor,
        hasMore: data.hasMore,
        isLoading: false,
        isInitialLoad: false,
      }));
    } catch (err) {
      setState((s) => ({ ...s, isLoading: false, isInitialLoad: false, error: err }));
    } finally {
      isLoadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  const onPostCreated = useCallback((post: Post) => {
    setState((s) => ({
      ...s,
      posts: applySortOrder([post, ...s.posts], s.sortOrder),
    }));
  }, []);

  const setSortOrder = useCallback((order: SortOrder) => {
    setState((s) => ({
      ...s,
      sortOrder: order,
      posts: applySortOrder(s.posts, order),
    }));
  }, []);

  const retry = useCallback(() => {
    setState((s) => ({ ...s, error: null, isInitialLoad: s.posts.length === 0, hasMore: true }));
    setTimeout(() => loadMore(), 0);
  }, [loadMore]);

  return { ...state, loadMore, onPostCreated, setSortOrder, retry };
}
