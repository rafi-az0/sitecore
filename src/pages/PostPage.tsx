import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { usePost } from "../hooks/usePost";
import { useComments } from "../hooks/useComments";
import { PostDetail } from "../components/post/PostDetail";
import { PageContainer } from "../components/layout/PageContainer";
import { ErrorBanner } from "../components/ui/ErrorBanner";
import { Button } from "../components/ui/Button";
import { getErrorMessage } from "../utils/errorMessages";

function PostSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 animate-pulse">
      <div className="lg:flex-[3] bg-neutral-800 min-h-[300px] lg:min-h-[500px]" />
      <div className="lg:flex-[1] lg:min-w-[340px] p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-neutral-800" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-neutral-800 rounded w-1/2" />
            <div className="h-3 bg-neutral-800 rounded w-1/3" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-neutral-800 rounded w-full" />
          <div className="h-3 bg-neutral-800 rounded w-4/5" />
          <div className="h-3 bg-neutral-800 rounded w-3/5" />
        </div>
      </div>
    </div>
  );
}

export function PostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { post, isLoading, error } = usePost(id!);
  const { comments, isLoading: commentsLoading, error: commentsError } = useComments(id!);

  return (
    <PageContainer>
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-5 -ml-1">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {isLoading && <PostSkeleton />}

      {!!error && !isLoading && (
        <div className="flex flex-col items-center gap-4 py-20">
          <ErrorBanner message={getErrorMessage(error)} className="max-w-md" />
          <Button variant="ghost" onClick={() => navigate("/")}>
            Return to feed
          </Button>
        </div>
      )}

      {post && !isLoading && (
        <PostDetail
          post={post}
          comments={comments}
          commentsLoading={commentsLoading}
          commentsError={commentsError}
        />
      )}
    </PageContainer>
  );
}
