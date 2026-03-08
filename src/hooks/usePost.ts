import { useState, useEffect } from "react";
import { fetchPost } from "../api/posts";
import type { Post } from "../api/types";

export function usePost(id: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchPost(id)
      .then((data) => {
        if (!cancelled) {
          setPost(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { post, isLoading, error };
}
