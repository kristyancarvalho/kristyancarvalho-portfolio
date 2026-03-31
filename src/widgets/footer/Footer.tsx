import { NavLink } from "react-router-dom";
import { profile } from "@/entities/profile";
import type { Translations } from "@/shared/i18n";

interface FooterProps {
  t: Translations;
}

export function Footer({ t }: FooterProps) {
  const links = [
    { label: t.nav.home, to: "/" },
    { label: t.nav.about, to: "/sobre" },
    { label: t.nav.projects, to: "/projetos" },
    { label: t.nav.posts, to: "/posts" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--color-accent-dim), transparent)",
          pointerEvents: "none",
        }}
      />
      <div
        className="wrap"
        style={{
          paddingTop: "3rem",
          paddingBottom: "3rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2.5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "2.5rem",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "var(--color-text)",
                letterSpacing: "-0.03em",
                display: "block",
                marginBottom: "0.875rem",
              }}
            >
              kristyan
              <span style={{ color: "var(--color-accent)", textShadow: "0 0 12px var(--color-accent-glow)" }}>
                .dev
              </span>
            </span>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--color-muted)",
                lineHeight: 1.8,
                maxWidth: "18rem",
              }}
            >
              {t.footer.description}
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "var(--color-accent)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              {t.footer.usefulLinks}
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", listStyle: "none" }}>
              {links.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--color-muted)",
                      textDecoration: "none",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--color-accent)")}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = "var(--color-muted)")}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "var(--color-accent)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              {t.footer.contact}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "github", href: profile.github },
                { label: "instagram", href: profile.instagram },
                { label: "whatsapp", href: profile.whatsapp },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
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
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="wrap" style={{ paddingTop: "1.125rem", paddingBottom: "1.125rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: "var(--color-muted)",
            }}
          >
            &copy; {new Date().getFullYear()} {profile.name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}