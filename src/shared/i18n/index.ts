import { ptBR } from "./locales/pt-BR";
import { enUS } from "./locales/en-US";
import type { Locale } from "@/shared/types";

export const translations = {
  "pt-BR": ptBR,
  "en-US": enUS,
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export type { Translations } from "./locales/pt-BR";
