import { useState, useCallback } from "react";
import type { Locale } from "@/shared/types";
import { getTranslations } from "@/shared/i18n";

function getInitialLocale(): Locale {
  const saved = localStorage.getItem("locale") as Locale | null;
  if (saved === "pt-BR" || saved === "en-US") return saved;
  const browser = navigator.language;
  if (browser.startsWith("pt")) return "pt-BR";
  return "en-US";
}

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  const changeLocale = useCallback((next: Locale) => {
    localStorage.setItem("locale", next);
    setLocale(next);
  }, []);

  const t = getTranslations(locale);

  return { locale, changeLocale, t };
}
