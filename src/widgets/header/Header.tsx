import { NavLink, useLocation } from "react-router-dom";
import { ThemeSwitch } from "@/widgets/theme-switch";
import { LanguageSwitch } from "@/widgets/language-switch";
import type { Theme, Locale } from "@/shared/types";
import type { Translations } from "@/shared/i18n";
import { useState } from "react";
import { profile } from "@/entities/profile";

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  locale: Locale;
  onChangeLocale: (l: Locale) => void;
  t: Translations;
}

export function Header({
  theme,
  onToggleTheme,
  locale,
  onChangeLocale,
  t,
}: HeaderProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.nav.home, to: "/" },
    { label: t.nav.about, to: "/sobre" },
    { label: t.nav.projects, to: "/projetos" },
    { label: t.nav.posts, to: "/posts" },
  ];

  const isPostActive = pathname.startsWith("/post/");

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg)",
      }}
    >
      <div
        className="wrap"
        style={{
          height: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <NavLink
          to="/"
          className="font-mono text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-150"
        >
          [kristyan<span className="text-[var(--color-accent)]">.dev</span>]
        </NavLink>
        <nav
          className="hidden sm:flex items-center gap-1"
          aria-label="Navegação principal"
        >
          {links.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => {
                const active = isActive || (to === "/posts" && isPostActive);
                return [
                  "font-mono text-xs px-3 py-1.5 rounded-[var(--radius-sm)] transition-colors duration-150",
                  active
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-text)]",
                ].join(" ");
              }}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitch locale={locale} onChange={onChangeLocale} />
          <ThemeSwitch theme={theme} onToggle={onToggleTheme} />
          <button
            className="sm:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 text-[var(--color-muted)]"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={`block w-4 h-px bg-current transition-transform duration-150 ${open ? "rotate-45 translate-y-[3px]" : ""}`}
            />
            <span
              className={`block w-4 h-px bg-current transition-opacity duration-150 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-4 h-px bg-current transition-transform duration-150 ${open ? "-rotate-45 -translate-y-[3px]" : ""}`}
            />
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="sm:hidden"
          style={{
            borderTop: "1px solid var(--color-border)",
            backgroundColor: "var(--color-bg)",
          }}
          aria-label="Navegação mobile"
        >
          <div
            className="wrap"
            style={{
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {links.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => {
                  const active = isActive || (to === "/posts" && isPostActive);
                  return [
                    "font-mono text-sm px-3 py-2 rounded-[var(--radius-md)] transition-colors duration-150",
                    active
                      ? "text-[var(--color-accent)] bg-[var(--color-surface)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]",
                  ].join(" ");
                }}
              >
                {label}
              </NavLink>
            ))}
            <div
              style={{
                paddingTop: "0.5rem",
                marginTop: "0.25rem",
                borderTop: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                paddingLeft: "0.75rem",
              }}
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                gh
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                ig
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
