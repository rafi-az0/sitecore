import type { Post } from "../../api/types";
import { PostMeta } from "./PostMeta";
import { CommentList } from "./CommentList";
import type { Comment } from "../../api/types";

interface PostDetailProps {
  post: Post;
  comments: Comment[];
  commentsLoading: boolean;
  commentsError: unknown;
}

export function PostDetail({ post, comments, commentsLoading, commentsError }: PostDetailProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-0 lg:gap-0 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
      {/* Image */}
      <div className="lg:flex-[3] bg-neutral-950 flex items-center justify-center min-h-[300px]">
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="w-full h-full object-contain max-h-[80vh]"
        />
      </div>

      {/* Sidebar */}
      <div className="lg:flex-[1] lg:min-w-[340px] lg:max-w-[400px] flex flex-col divide-y divide-neutral-800 overflow-y-auto">
        {/* Meta */}
        <div className="p-5">
          <PostMeta post={post} />
        </div>

        {/* Comments */}
        <div className="p-5 flex-1">
          <CommentList comments={comments} isLoading={commentsLoading} error={commentsError} />
        </div>
      </div>
    </div>
  );
}
