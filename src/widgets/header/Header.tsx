import { NavLink, useLocation } from "react-router-dom";
import { ThemeSwitch } from "@/widgets/theme-switch";
import { LanguageSwitch } from "@/widgets/language-switch";
import type { Theme, Locale } from "@/shared/types";
import type { Translations } from "@/shared/i18n";
import { useState, useRef, useLayoutEffect, useCallback, useEffect } from "react";
import { profile } from "@/entities/profile";
import { Menu, X } from "lucide-react";

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

export function Header({ theme, onToggleTheme, locale, onChangeLocale, t }: HeaderProps) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [tabRect, setTabRect] = useState<TabRect | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const openRef = useRef(open);

  useLayoutEffect(() => {
    openRef.current = open;
  });

  const links = [
    { label: t.nav.home, to: "/" },
    { label: t.nav.about, to: "/sobre" },
    { label: t.nav.projects, to: "/projetos" },
    { label: t.nav.contact, to: "/contato" },
    { label: t.nav.posts, to: "/posts" },
  ];

  const getActiveKey = useCallback((): string => {
    if (pathname === "/") return "/";
    if (pathname.startsWith("/sobre")) return "/sobre";
    if (pathname.startsWith("/projetos")) return "/projetos";
    if (pathname.startsWith("/contato")) return "/contato";
    if (pathname.startsWith("/posts") || pathname.startsWith("/post/")) return "/posts";
    return "";
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      if (!mobile && openRef.current) setOpen(false);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    const activeKey = getActiveKey();
    const el = linkRefs.current.get(activeKey);
    const nav = navRef.current;
    const frame = requestAnimationFrame(() => {
      if (!el || !nav) {
        setTabRect(null);
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const next = { left: elRect.left - navRect.left, width: elRect.width };
      setTabRect(prev =>
        prev?.left === next.left && prev?.width === next.width ? prev : next
      );
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, getActiveKey]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div
        style={{
          borderBottom: `1px solid ${scrolled ? "color-mix(in oklch, var(--color-border) 80%, transparent)" : "transparent"}`,
          backgroundColor: scrolled
            ? "color-mix(in oklch, var(--color-bg) 78%, transparent)"
            : "color-mix(in oklch, var(--color-bg) 60%, transparent)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          transition: "border-color 0.3s ease, background-color 0.3s ease",
        }}
      >
        <div
          className="wrap"
          style={{
            height: "3.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <NavLink
            to="/"
            aria-label="kristyan.dev — home"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "var(--color-text)",
              textDecoration: "none",
              letterSpacing: "-0.03em",
              transition: "opacity 0.15s ease",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            kristyan
            <span
              style={{
                color: "var(--color-accent)",
                textShadow: "0 0 16px var(--color-accent-glow)",
              }}
            >
              .dev
            </span>
          </NavLink>

          {!isMobile && (
            <nav
              ref={navRef}
              aria-label={t.nav.home}
              style={{
                position: "relative",
                padding: "0.25rem",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-full)",
                background: "color-mix(in oklch, var(--color-surface) 85%, transparent)",
                backdropFilter: "blur(12px)",
                gap: "0",
                display: "flex",
                alignItems: "center",
              }}
            >
              {tabRect && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "0.25rem",
                    bottom: "0.25rem",
                    left: tabRect.left,
                    width: tabRect.width,
                    borderRadius: "var(--radius-full)",
                    background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
                    boxShadow: "0 0 16px var(--color-primary-glow)",
                    transition: "left 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />
              )}
              {links.map(({ label, to }) => {
                const isActive = to === getActiveKey();
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
                      fontSize: "0.7rem",
                      padding: "0.4rem 0.9rem",
                      borderRadius: "var(--radius-full)",
                      transition: "color 0.15s ease",
                      textDecoration: "none",
                      position: "relative",
                      zIndex: 1,
                      color: isActive ? "white" : "var(--color-muted)",
                      fontWeight: isActive ? 500 : 400,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </NavLink>
                );
              })}
            </nav>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <LanguageSwitch locale={locale} onChange={onChangeLocale} />
            <ThemeSwitch theme={theme} onToggle={onToggleTheme} />
            {isMobile && (
              <button
                onClick={() => setOpen(o => !o)}
                aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
                aria-expanded={open}
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-muted)",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  transition: "border-color 0.15s ease, color 0.15s ease",
                  flexShrink: 0,
                }}
              >
                {open
                  ? <X size={16} strokeWidth={2} />
                  : <Menu size={16} strokeWidth={2} />
                }
              </button>
            )}
          </div>
        </div>
      </div>

      {isMobile && open && (
        <nav
          style={{
            borderBottom: "1px solid var(--color-border)",
            backgroundColor: "color-mix(in oklch, var(--color-bg) 94%, transparent)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            animation: "slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
          aria-label="Navegação mobile"
        >
          <div
            className="wrap"
            style={{
              paddingTop: "1rem",
              paddingBottom: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {links.map(({ label, to }) => {
              const isActive = to === getActiveKey();
              return (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.82rem",
                    padding: "0.7rem 1rem",
                    borderRadius: "var(--radius-lg)",
                    textDecoration: "none",
                    transition: "background-color 0.15s ease, color 0.15s ease",
                    color: isActive ? "white" : "var(--color-muted)",
                    background: isActive
                      ? "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)"
                      : "transparent",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {label}
                </NavLink>
              );
            })}
            <div
              style={{
                paddingTop: "0.75rem",
                marginTop: "0.5rem",
                borderTop: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                paddingLeft: "1rem",
              }}
            >
              {[
                { label: "github", href: profile.github },
                { label: "linkedin", href: profile.linkedin },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--color-muted)",
                    textDecoration: "none",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--color-accent)")}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = "var(--color-muted)")}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}