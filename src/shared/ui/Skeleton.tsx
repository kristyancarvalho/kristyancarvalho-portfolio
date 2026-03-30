import { cn } from "@/shared/lib";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse", className)}
      style={{
        backgroundColor: "var(--color-surface)",
        borderRadius: "var(--radius-sm)",
        ...style,
      }}
    />
  );
}