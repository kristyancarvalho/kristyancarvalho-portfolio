import { cn } from "@/shared/lib";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse rounded-[var(--radius-md)] bg-[var(--color-surface)]", className)} />
  );
}
