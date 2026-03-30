import type { Locale } from "@/shared/types";

interface LanguageSwitchProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
}

export function LanguageSwitch({ locale, onChange }: LanguageSwitchProps) {
  return (
    <button
      onClick={() => onChange(locale === "pt-BR" ? "en-US" : "pt-BR")}
      aria-label="Trocar idioma"
      className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      {locale === "pt-BR" ? "en" : "pt"}
    </button>
  );
}
