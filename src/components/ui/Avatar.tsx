import { cn } from "../../utils/cn";

const PALETTE = [
  "bg-violet-700",
  "bg-sky-700",
  "bg-emerald-700",
  "bg-rose-700",
  "bg-amber-700",
  "bg-cyan-700",
  "bg-fuchsia-700",
  "bg-teal-700",
];

function colorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ name, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold select-none",
        colorForName(name),
        {
          sm: "h-7 w-7 text-xs",
          md: "h-9 w-9 text-sm",
          lg: "h-12 w-12 text-base",
        }[size],
        className,
      )}
      aria-label={name}
    >
      {initials(name)}
    </div>
  );
}
