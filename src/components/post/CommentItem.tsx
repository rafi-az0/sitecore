import type { Comment } from "../../api/types";
import { Avatar } from "../ui/Avatar";
import { formatRelativeDate } from "../../utils/formatDate";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex gap-3">
      <Avatar name={comment.author} size="sm" className="shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-neutral-200">{comment.author}</span>
          <span className="text-xs text-neutral-600">{formatRelativeDate(comment.createdAt)}</span>
        </div>
        <p className="text-sm text-neutral-400 mt-0.5 leading-relaxed">{comment.text}</p>
      </div>
    </div>
  );
}
