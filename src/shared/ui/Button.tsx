import { cn } from "@/shared/lib";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "glow";
  size?: "sm" | "md" | "lg";
}

const sizeStyle: Record<string, React.CSSProperties> = {
  sm: {
    fontSize: "0.72rem",
    padding: "0.35rem 0.875rem",
    borderRadius: "var(--radius-lg)",
  },
  md: {
    fontSize: "0.82rem",
    padding: "0.6rem 1.25rem",
    borderRadius: "var(--radius-lg)",
  },
  lg: {
    fontSize: "0.9rem",
    padding: "0.75rem 1.75rem",
    borderRadius: "var(--radius-xl)",
  },
};

const variantStyle: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--color-primary)",
    color: "white",
    border: "1px solid transparent",
    boxShadow: "0 0 16px var(--color-primary-dim)",
  },
  glow: {
    backgroundColor: "var(--color-primary)",
    color: "white",
    border: "1px solid transparent",
    boxShadow: "0 0 24px var(--color-primary-glow), 0 0 48px var(--color-primary-dim)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--color-muted)",
    border: "1px solid transparent",
  },
  outline: {
    backgroundColor: "transparent",
    color: "var(--color-text)",
    border: "1px solid var(--color-border)",
  },
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  style,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] disabled:opacity-50 disabled:pointer-events-none",
        className,
      )}
      style={{
        cursor: "pointer",
        letterSpacing: "-0.01em",
        ...sizeStyle[size],
        ...variantStyle[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}