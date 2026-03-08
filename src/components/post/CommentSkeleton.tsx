export function CommentSkeleton() {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="h-8 w-8 rounded-full bg-neutral-800 shrink-0" />
      <div className="flex-1 space-y-2 pt-1">
        <div className="h-3 bg-neutral-800 rounded w-1/4" />
        <div className="h-3 bg-neutral-800 rounded w-3/4" />
      </div>
    </div>
  );
}
