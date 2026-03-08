import { useState, useEffect } from "react";
import { fetchComments } from "../api/comments";
import type { Comment } from "../api/types";

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchComments(postId)
      .then((data) => {
        if (!cancelled) {
          setComments(data.items);
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
  }, [postId]);

  return { comments, isLoading, error };
}
