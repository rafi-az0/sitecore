import { useMemo, useState } from "react";
import { FeedGrid } from "../components/feed/FeedGrid";
import { PageContainer } from "../components/layout/PageContainer";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorBanner } from "../components/ui/ErrorBanner";
import { useFeedContext } from "../hooks/FeedContext";
import { cn } from "../utils/cn";
import { getErrorMessage } from "../utils/errorMessages";

type SortOrder = "newest" | "oldest";

export function FeedPage() {
  const { posts, isLoading, isInitialLoad, hasMore, error, loadMore, retry } = useFeedContext();
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const sortedPosts = useMemo(() => {
    if (sortOrder === "oldest") {
      return [...posts].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }
    return [...posts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [posts, sortOrder]);

  // Full-page error on initial load failure
  if (!!error && isInitialLoad) {
    return (
      <PageContainer className="flex flex-col items-center justify-center min-h-[60vh]">
        <ErrorBanner message={getErrorMessage(error)} onRetry={retry} className="max-w-md" />
      </PageContainer>
    );
  }

  if (!isLoading && posts.length === 0 && !error) {
    return (
      <PageContainer>
        <EmptyState title="No posts yet" description="Be the first to share something beautiful." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex items-center justify-end mb-5">
        <div className="flex items-center gap-1 rounded-lg bg-neutral-900 border border-neutral-800 p-1">
          {(["newest", "oldest"] as SortOrder[]).map((order) => (
            <button
              key={order}
              onClick={() => setSortOrder(order)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize",
                sortOrder === order
                  ? "bg-neutral-700 text-neutral-50"
                  : "text-neutral-500 hover:text-neutral-300",
              )}
            >
              {order}
            </button>
          ))}
        </div>
      </div>

      <FeedGrid
        posts={sortedPosts}
        isLoading={isLoading}
        isInitialLoad={isInitialLoad}
        hasMore={hasMore}
        error={!!error && !isInitialLoad ? error : null}
        onLoadMore={loadMore}
        onRetry={retry}
      />
    </PageContainer>
  );
}
