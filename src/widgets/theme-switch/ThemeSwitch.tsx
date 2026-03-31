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
        width: "2.25rem",
        height: "2.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
        color: "var(--color-muted)",
        cursor: "pointer",
        transition: "border-color 0.15s ease, color 0.15s ease, transform 0.15s ease",
        fontSize: "0.95rem",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--color-primary)";
        el.style.color = "var(--color-primary)";
        el.style.transform = "rotate(12deg)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--color-border)";
        el.style.color = "var(--color-muted)";
        el.style.transform = "";
      }}
    >
      {theme === "dark" ? "☀" : "◑"}
    </button>
  );
}