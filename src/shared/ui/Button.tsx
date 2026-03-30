import { cn } from "@/shared/lib";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "glow";
  size?: "sm" | "md" | "lg";
}

const sizeStyle: Record<string, React.CSSProperties> = {
  sm: {
    fontSize: "0.72rem",
    padding: "0.3rem 0.75rem",
    borderRadius: "var(--radius-md)",
  },
  md: {
    fontSize: "0.8rem",
    padding: "0.55rem 1.1rem",
    borderRadius: "var(--radius-md)",
  },
  lg: {
    fontSize: "0.875rem",
    padding: "0.7rem 1.5rem",
    borderRadius: "var(--radius-lg)",
  },
};

const variantStyle: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--color-accent)",
    color: "white",
    border: "1px solid transparent",
    boxShadow: "0 0 16px var(--color-accent-dim)",
  },
  glow: {
    backgroundColor: "var(--color-accent)",
    color: "white",
    border: "1px solid transparent",
    boxShadow: "0 0 20px var(--color-accent-glow), 0 0 40px var(--color-accent-dim)",
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
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] disabled:opacity-50 disabled:pointer-events-none",
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