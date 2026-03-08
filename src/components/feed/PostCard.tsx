import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../../api/types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();

  return (
    <article
      className="relative rounded-xl overflow-hidden bg-neutral-900 cursor-pointer group"
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      <div className="relative aspect-square">
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
          <p className="text-sm text-neutral-100 line-clamp-3 leading-relaxed">{post.caption}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <Heart className="h-3.5 w-3.5 text-violet-400" />
            <span className="text-xs text-neutral-300">{post.likes}</span>
            <span className="text-xs text-neutral-500 ml-auto">{post.author}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
