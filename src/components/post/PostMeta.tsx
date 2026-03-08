import { Heart } from "lucide-react";
import type { Post } from "../../api/types";
import { Avatar } from "../ui/Avatar";
import { formatRelativeDate } from "../../utils/formatDate";

interface PostMetaProps {
  post: Post;
}

export function PostMeta({ post }: PostMetaProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Avatar name={post.author} size="md" />
        <div>
          <p className="text-sm font-medium text-neutral-100">{post.author}</p>
          <p className="text-xs text-neutral-500">{formatRelativeDate(post.createdAt)}</p>
        </div>
      </div>
      {post.caption && <p className="text-base leading-relaxed text-neutral-200">{post.caption}</p>}
      <div className="flex items-center gap-1.5">
        <Heart className="h-4 w-4 text-violet-400" />
        <span className="text-sm text-neutral-400">{post.likes} likes</span>
      </div>
    </div>
  );
}
