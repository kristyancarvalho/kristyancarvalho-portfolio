import type { Theme } from "@/shared/types";

interface ThemeSwitchProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeSwitch({ theme, onToggle }: ThemeSwitchProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      style={{
        width: "2rem",
        height: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
        color: "var(--color-muted)",
        cursor: "pointer",
        transition: "border-color 0.15s ease, color 0.15s ease",
        fontSize: "0.875rem",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
        (e.currentTarget as HTMLElement).style.color = "var(--color-primary)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
        (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
      }}
    >
      {theme === "dark" ? "☀" : "◐"}
    </button>
  );
}