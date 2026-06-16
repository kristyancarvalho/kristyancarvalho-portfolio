import { useLocale } from "@/shared/hooks";
import { LocaleContext } from "./LocaleContext";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const value = useLocale();
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
