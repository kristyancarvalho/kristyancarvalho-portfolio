import { cn } from "@/shared/lib";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-mono transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]",
    ghost: "text-[var(--color-text)] hover:bg-[var(--color-surface)]",
    outline: "border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface)]",
  };
  const sizes = {
    sm: "text-xs px-3 py-1.5 rounded-[var(--radius-sm)]",
    md: "text-sm px-4 py-2 rounded-[var(--radius-md)]",
    lg: "text-sm px-6 py-3 rounded-[var(--radius-md)]",
  };
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
