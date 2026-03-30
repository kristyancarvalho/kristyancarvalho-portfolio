import { NavLink, useLocation } from "react-router-dom";
import { ThemeSwitch } from "@/widgets/theme-switch";
import { LanguageSwitch } from "@/widgets/language-switch";
import type { Theme, Locale } from "@/shared/types";
import type { Translations } from "@/shared/i18n";
import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { profile } from "@/entities/profile";

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  locale: Locale;
  onChangeLocale: (l: Locale) => void;
  t: Translations;
}

interface TabRect {
  left: number;
  width: number;
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
  const [tabRect, setTabRect] = useState<TabRect | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const links = [
    { label: t.nav.home, to: "/" },
    { label: t.nav.about, to: "/sobre" },
    { label: t.nav.projects, to: "/projetos" },
    { label: t.nav.posts, to: "/posts" },
  ];

  const getActiveKey = useCallback((): string => {
    const isPostActive = pathname.startsWith("/post/");
    if (pathname === "/") return "/";
    if (pathname.startsWith("/sobre")) return "/sobre";
    if (pathname.startsWith("/projetos")) return "/projetos";
    if (pathname.startsWith("/posts") || isPostActive) return "/posts";
    return "";
  }, [pathname]);

  useLayoutEffect(() => {
    const activeKey = getActiveKey();
    const el = linkRefs.current.get(activeKey);
    const nav = navRef.current;

    const frame = requestAnimationFrame(() => {
      if (!el || !nav) {
        setTabRect(prev => (prev === null ? null : null));
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const next = {
        left: elRect.left - navRect.left,
        width: elRect.width,
      };
      setTabRect(prev => 
        prev?.left === next.left && prev?.width === next.width ? prev : next
      );
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, getActiveKey]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          borderBottom: "1px solid var(--color-border)",
          backgroundColor: "color-mix(in oklch, var(--color-bg) 85%, transparent)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div
          className="wrap"
          style={{
            height: "3.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <NavLink
            to="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "var(--color-text)",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--color-accent)")}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = "var(--color-text)")}
          >
            kristyan
            <span style={{ color: "var(--color-accent)" }}>.dev</span>
          </NavLink>

          <nav
            ref={navRef}
            className="hidden sm:flex items-center"
            aria-label="Navegação principal"
            style={{
              position: "relative",
              padding: "0.2rem",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--color-surface)",
              gap: "0",
            }}
          >
            {tabRect && (
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "0.2rem",
                  bottom: "0.2rem",
                  left: tabRect.left,
                  width: tabRect.width,
                  borderRadius: "calc(var(--radius-lg) - 0.2rem)",
                  backgroundColor: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 0 12px var(--color-accent-dim), 0 1px 4px rgb(0 0 0 / 0.08)",
                  transition: "left 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
            )}
            {links.map(({ label, to }) => {
              const activeKey = getActiveKey();
              const isActive = to === activeKey;
              return (
                <NavLink
                  key={to}
                  to={to}
                  ref={el => {
                    if (el) linkRefs.current.set(to, el);
                    else linkRefs.current.delete(to);
                  }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "calc(var(--radius-lg) - 0.2rem)",
                    transition: "color 0.15s ease",
                    textDecoration: "none",
                    position: "relative",
                    zIndex: 1,
                    color: isActive ? "var(--color-text)" : "var(--color-muted)",
                    fontWeight: isActive ? 500 : 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </NavLink>
              );
            })}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <LanguageSwitch locale={locale} onChange={onChangeLocale} />
            <ThemeSwitch theme={theme} onToggle={onToggleTheme} />
            <button
              className="sm:hidden"
              style={{
                width: "2rem",
                height: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                color: "var(--color-muted)",
                background: "none",
                border: "none",
              }}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen(o => !o)}
            >
              <span
                style={{
                  display: "block",
                  width: "16px",
                  height: "1px",
                  background: "currentColor",
                  transition: "transform 0.15s ease",
                  transform: open ? "rotate(45deg) translateY(3px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "16px",
                  height: "1px",
                  background: "currentColor",
                  transition: "opacity 0.15s ease",
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "16px",
                  height: "1px",
                  background: "currentColor",
                  transition: "transform 0.15s ease",
                  transform: open ? "rotate(-45deg) translateY(-3px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav
          className="sm:hidden"
          style={{
            borderBottom: "1px solid var(--color-border)",
            backgroundColor: "color-mix(in oklch, var(--color-bg) 95%, transparent)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
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
              gap: "0.125rem",
            }}
          >
            {links.map(({ label, to }) => {
              const activeKey = getActiveKey();
              const isActive = to === activeKey;
              return (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    padding: "0.6rem 0.75rem",
                    borderRadius: "var(--radius-md)",
                    textDecoration: "none",
                    transition: "background-color 0.15s ease, color 0.15s ease",
                    color: isActive ? "var(--color-accent)" : "var(--color-muted)",
                    backgroundColor: isActive ? "var(--color-surface)" : "transparent",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {label}
                </NavLink>
              );
            })}
            <div
              style={{
                paddingTop: "0.5rem",
                marginTop: "0.25rem",
                borderTop: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                paddingLeft: "0.75rem",
              }}
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--color-muted)",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--color-text)")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "var(--color-muted)")}
              >
                github
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--color-muted)",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--color-text)")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "var(--color-muted)")}
              >
                instagram
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}