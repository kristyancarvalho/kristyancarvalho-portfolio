import { createContext, useContext } from "react";
import { useLocale } from "@/shared/hooks";
import type { Locale } from "@/shared/types";
import type { Translations } from "@/shared/i18n";

interface LocaleContextValue {
  locale: Locale;
  changeLocale: (l: Locale) => void;
  t: Translations;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const value = useLocale();
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocaleContext() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocaleContext must be used within LocaleProvider");
  return ctx;
}
