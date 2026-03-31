import type { Locale } from "@/shared/types";

interface LanguageSwitchProps {
  locale: Locale;
  onChange: (l: Locale) => void;
}

export function LanguageSwitch({ locale, onChange }: LanguageSwitchProps) {
  const next: Locale = locale === "pt-BR" ? "en-US" : "pt-BR";
  const label = locale === "pt-BR" ? "EN" : "PT";

  return (
    <button
      onClick={() => onChange(next)}
      aria-label={`Switch to ${next}`}
      style={{
        height: "2rem",
        padding: "0 0.625rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
        color: "var(--color-muted)",
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontSize: "0.68rem",
        letterSpacing: "0.06em",
        fontWeight: 500,
        transition: "border-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--color-primary)";
        el.style.color = "var(--color-primary)";
        el.style.boxShadow = "0 0 8px var(--color-primary-dim)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--color-border)";
        el.style.color = "var(--color-muted)";
        el.style.boxShadow = "none";
      }}
    >
      {label}
    </button>
  );
}