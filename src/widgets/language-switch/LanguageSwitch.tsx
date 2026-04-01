import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import type { Locale } from "@/shared/types";

interface LanguageSwitchProps {
  locale: Locale;
  onChange: (l: Locale) => void;
}

const options: { locale: Locale; flag: string; label: string }[] = [
  { locale: "pt-BR", flag: "🇧🇷", label: "PT" },
  { locale: "en-US", flag: "🇺🇸", label: "EN" },
];

export function LanguageSwitch({ locale, onChange }: LanguageSwitchProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const current = options.find(o => o.locale === locale) ?? options[0];

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={`Language: ${current.label}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        style={{
          height: "2.25rem",
          padding: "0 0.75rem",
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface)",
          color: "var(--color-muted)",
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          letterSpacing: "0.06em",
          fontWeight: 500,
          transition: "border-color 0.15s ease, color 0.15s ease",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget;
          el.style.borderColor = "var(--color-primary)";
          el.style.color = "var(--color-text)";
        }}
        onMouseLeave={e => {
          if (open) return;
          const el = e.currentTarget;
          el.style.borderColor = "var(--color-border)";
          el.style.color = "var(--color-muted)";
        }}
      >
        <Globe size={13} strokeWidth={1.75} />
        <span>{current.label}</span>
        <ChevronDown
          size={11}
          strokeWidth={2}
          style={{
            marginLeft: "0.1rem",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease",
            opacity: 0.6,
          }}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          style={{
            position: "absolute",
            top: "calc(100% + 0.5rem)",
            right: 0,
            minWidth: "7.5rem",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgb(0 0 0 / 0.12), 0 0 0 1px var(--color-accent-dim)",
            animation: "slideDown 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            zIndex: 100,
          }}
        >
          {options.map(opt => {
            const isSelected = opt.locale === locale;
            return (
              <button
                key={opt.locale}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.locale);
                  setOpen(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  padding: "0.65rem 0.875rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.04em",
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? "var(--color-accent)" : "var(--color-muted)",
                  backgroundColor: isSelected ? "var(--color-accent-dim)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background-color 0.12s ease, color 0.12s ease",
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-surface2)";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
                  }
                }}
              >
                <span style={{ fontSize: "1rem", lineHeight: 1 }}>{opt.flag}</span>
                <span>{opt.label}</span>
                {isSelected && (
                  <Check size={11} strokeWidth={2.5} style={{ marginLeft: "auto", opacity: 0.6 }} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}