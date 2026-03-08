import type { Post } from "../../api/types";
import { getErrorMessage } from "../../utils/errorMessages";
import { ErrorBanner } from "../ui/ErrorBanner";
import { LoadMoreTrigger } from "./LoadMoreTrigger";
import { PostCard } from "./PostCard";
import { PostCardSkeleton } from "./PostCardSkeleton";

interface FeedGridProps {
  posts: Post[];
  isLoading: boolean;
  isInitialLoad: boolean;
  hasMore: boolean;
  error: unknown;
  onLoadMore: () => void;
  onRetry: () => void;
}

const SKELETON_COUNT_INITIAL = 6;
const SKELETON_COUNT_MORE = 3;

export function FeedGrid({
  posts,
  isLoading,
  isInitialLoad,
  hasMore,
  error,
  onLoadMore,
  onRetry,
}: FeedGridProps) {
  const skeletonCount = isInitialLoad ? SKELETON_COUNT_INITIAL : SKELETON_COUNT_MORE;

  return (
    <div>
      {/* Regular CSS grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {isLoading &&
          Array.from({ length: skeletonCount }).map((_, i) => (
            <PostCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {/* Load-more error */}
      {!!error && !isInitialLoad && (
        <ErrorBanner
          message={getErrorMessage(error)}
          onRetry={onRetry}
          className="mt-6 max-w-md mx-auto"
        />
      )}

      {/* IntersectionObserver sentinel */}
      {!error && <LoadMoreTrigger onVisible={onLoadMore} disabled={isLoading || !hasMore} />}

      {/* End of feed */}
      {!hasMore && !isLoading && posts.length > 0 && (
        <p className="text-center text-sm text-neutral-600 py-8">You've reached the end</p>
      )}
    </div>
  );
}
