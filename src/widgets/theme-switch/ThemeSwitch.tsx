import { Sun, Moon } from "lucide-react";
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
        transition: "border-color 0.15s ease, color 0.15s ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--color-primary)";
        el.style.color = "var(--color-primary)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--color-border)";
        el.style.color = "var(--color-muted)";
      }}
    >
      {theme === "dark"
        ? <Sun size={15} strokeWidth={2} />
        : <Moon size={15} strokeWidth={2} />
      }
    </button>
  );
}