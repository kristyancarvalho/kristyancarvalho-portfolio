import { cn } from "@/shared/lib";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "glow";
  size?: "sm" | "md" | "lg";
}

const sizeStyle: Record<string, React.CSSProperties> = {
  sm: {
    fontSize: "0.72rem",
    padding: "0.4rem 1rem",
    borderRadius: "var(--radius-full)",
    letterSpacing: "0.01em",
  },
  md: {
    fontSize: "0.82rem",
    padding: "0.65rem 1.5rem",
    borderRadius: "var(--radius-full)",
    letterSpacing: "0.01em",
  },
  lg: {
    fontSize: "0.9rem",
    padding: "0.85rem 2rem",
    borderRadius: "var(--radius-full)",
    letterSpacing: "0.01em",
  },
};

const variantStyle: Record<string, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
    color: "white",
    border: "1px solid transparent",
    boxShadow: "0 0 20px var(--color-primary-dim), inset 0 1px 0 oklch(1 0 0 / 0.15)",
  },
  glow: {
    background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
    color: "white",
    border: "1px solid transparent",
    boxShadow: "0 0 30px var(--color-primary-glow), 0 0 60px var(--color-primary-dim), inset 0 1px 0 oklch(1 0 0 / 0.15)",
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
    backdropFilter: "blur(8px)",
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
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] disabled:opacity-40 disabled:pointer-events-none",
        className,
      )}
      style={{
        cursor: "pointer",
        ...sizeStyle[size],
        ...variantStyle[variant],
        ...style,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        if (variant === "glow" || variant === "primary") {
          el.style.filter = "brightness(1.1)";
          el.style.transform = "translateY(-1px)";
        }
        if (variant === "outline") {
          el.style.borderColor = "var(--color-accent)";
          el.style.color = "var(--color-accent)";
        }
        if (variant === "ghost") {
          el.style.color = "var(--color-text)";
        }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.filter = "";
        el.style.transform = "";
        if (variant === "outline") {
          el.style.borderColor = "var(--color-border)";
          el.style.color = "var(--color-text)";
        }
        if (variant === "ghost") {
          el.style.color = "var(--color-muted)";
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}