import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  ThemeProvider,
  LocaleProvider,
  useThemeContext,
  useLocaleContext,
} from "@/app/providers";
import { AppRouter } from "@/app/router";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import "@/app/styles/index.css";

function AppShell() {
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

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LocaleProvider>
          <AppShell />
        </LocaleProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
