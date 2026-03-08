import { Component, createContext, useContext, useMemo, useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import type { Post } from "./api/types";
import { AppShell } from "./components/layout/AppShell";
import { UploadModal } from "./components/upload/UploadModal";
import { FeedContext } from "./hooks/FeedContext";
import { useFeed } from "./hooks/useFeed";
import { FeedPage } from "./pages/FeedPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PostPage } from "./pages/PostPage";

// Bridges upload-open state from AppContent into the stable router tree
const UploadContext = createContext<{ open: () => void }>({ open: () => {} });

function AppShellWithUpload() {
  const { open } = useContext(UploadContext);
  return <AppShell onNewPost={open} />;
}

// Router is created once outside any component — stable reference
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShellWithUpload />,
    children: [
      { index: true, element: <FeedPage /> },
      { path: "posts/:id", element: <PostPage /> },
      { path: "404", element: <NotFoundPage /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
]);

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950">
          <div className="text-center">
            <p className="text-lg font-medium text-neutral-300">Something went wrong</p>
            <button
              className="mt-4 text-sm text-violet-400 underline"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const feedValue = useFeed();
  const uploadCtx = useMemo(() => ({ open: () => setUploadOpen(true) }), []);

  const handlePostCreated = (post: Post) => {
    feedValue.onPostCreated(post);
    setUploadOpen(false);
  };

  return (
    <FeedContext.Provider value={feedValue}>
      <UploadContext.Provider value={uploadCtx}>
        <RouterProvider router={router} />
        {uploadOpen && (
          <UploadModal onClose={() => setUploadOpen(false)} onSuccess={handlePostCreated} />
        )}
      </UploadContext.Provider>
    </FeedContext.Provider>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
