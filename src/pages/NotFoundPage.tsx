import { Link } from "react-router-dom";
import { PageContainer } from "../components/layout/PageContainer";

export function NotFoundPage() {
  return (
    <PageContainer className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <p className="text-6xl font-thin text-neutral-700 mb-4">404</p>
      <p className="text-lg font-medium text-neutral-300 mb-2">Page not found</p>
      <p className="text-sm text-neutral-500 mb-6">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-2"
      >
        Return to feed
      </Link>
    </PageContainer>
  );
}
