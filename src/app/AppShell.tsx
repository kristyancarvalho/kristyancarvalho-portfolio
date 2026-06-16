import { useLocaleContext, useThemeContext } from "@/app/providers";
import { AppRouter } from "@/app/router";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

export function AppShell() {
  const { theme, toggleTheme } = useThemeContext();
  const { locale, changeLocale, t } = useLocaleContext();
  return (
    <>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        locale={locale}
        onChangeLocale={changeLocale}
        t={t}
      />
      <main style={{ flex: 1 }}>
        <AppRouter />
      </main>
      <Footer t={t} />
    </>
  );
}
