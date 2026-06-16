import { createContext, useContext } from "react";
import type { Locale } from "@/shared/types";
import type { Translations } from "@/shared/i18n";

interface LocaleContextValue {
  locale: Locale;
  changeLocale: (l: Locale) => void;
  t: Translations;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocaleContext() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocaleContext must be used within LocaleProvider");
  return ctx;
}
