import { cn } from "@/shared/lib";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLbutton> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const sizeStyle: Record<string, React.CSSProperties> = {
  sm: {
    fontSize: "0.75rem",
    padding: "0.25rem 0.625rem",
    borderRadius: "var(--radius-sm)",
  },
  md: {
    fontSize: "0.875rem",
    padding: "0.5rem 1rem",
    borderRadius: "var(--radius-md)",
  },
  lg: {
    fontSize: "0.875rem",
    padding: "0.75rem 1.5rem",
    borderRadius: "var(--radius-md)",
  },
};

const variantStyle: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--color-accent)",
    color: "white",
    border: "none",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--color-text)",
    border: "none",
  },
  outline: {
    backgroundColor: "transparent",
    color: "var(--color-text)",
    border: "1px solid var(--color-text)",
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
        "inline-flex items-center justify-center gap-2 font-mono transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] disabled:opacity-50 disabled:pointer-events-none",
        className,
      )}
      style={{
        cursor: "pointer",
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
