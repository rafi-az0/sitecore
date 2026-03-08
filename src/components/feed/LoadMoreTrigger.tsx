import { useEffect, useRef } from "react";

interface LoadMoreTriggerProps {
  onVisible: () => void;
  disabled: boolean;
}

export function LoadMoreTrigger({ onVisible, disabled }: LoadMoreTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onVisible();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onVisible, disabled]);

  return <div ref={ref} className="h-1" aria-hidden="true" />;
}
