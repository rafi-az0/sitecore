import type { Comment } from "../../api/types";
import { CommentItem } from "./CommentItem";
import { CommentSkeleton } from "./CommentSkeleton";
import { ErrorBanner } from "../ui/ErrorBanner";
import { getErrorMessage } from "../../utils/errorMessages";

interface CommentListProps {
  comments: Comment[];
  isLoading: boolean;
  error: unknown;
}

export function CommentList({ comments, isLoading, error }: CommentListProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
        Comments
        {comments.length > 0 && <span className="ml-2 text-neutral-600">({comments.length})</span>}
      </h2>

      {isLoading && (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </div>
      )}

      {!!error && !isLoading && <ErrorBanner message={getErrorMessage(error)} />}

      {!isLoading && !error && comments.length === 0 && (
        <p className="text-sm text-neutral-600">No comments yet.</p>
      )}

      {!isLoading && !error && comments.length > 0 && (
        <div className="flex flex-col gap-4">
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))}
        </div>
      )}
    </div>
  );
}
