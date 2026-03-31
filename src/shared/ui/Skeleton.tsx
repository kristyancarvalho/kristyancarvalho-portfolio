import { cn } from "@/shared/lib";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton-shimmer", className)}
      style={{
        borderRadius: "var(--radius-lg)",
        ...style,
      }}
    />
  );
}