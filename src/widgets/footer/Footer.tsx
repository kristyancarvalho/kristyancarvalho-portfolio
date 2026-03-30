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
    <footer style={{ borderTop: "1px solid var(--color-border)" }}>
      <div
        className="wrap"
        style={{
          paddingTop: "2.5rem",
          paddingBottom: "2.5rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "2rem",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "var(--color-text)",
                letterSpacing: "-0.01em",
              }}
            >
              kristyan
              <span style={{ color: "var(--color-accent)" }}>.dev</span>
            </span>
            <p
              style={{
                marginTop: "0.75rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--color-muted)",
                lineHeight: 1.7,
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
                fontSize: "0.65rem",
                color: "var(--color-muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "0.875rem",
              }}
            >
              {t.footer.usefulLinks}
            </p>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                listStyle: "none",
              }}
            >
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
                fontSize: "0.65rem",
                color: "var(--color-muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "0.875rem",
              }}
            >
              {t.footer.contact}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
        <div
          className="wrap"
          style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
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