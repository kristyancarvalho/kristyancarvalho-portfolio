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
          gridTemplateColumns: "repeat(1, 1fr)",
          gap: "2rem",
        }}
      >
        <div
          style={{
            gridColumn: "1",
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "2rem",
          }}
          className="sm:grid-cols-3"
        >
          <div>
            <span className="font-mono text-sm text-[var(--color-text)]">
              [kristyan<span className="text-[var(--color-accent)]">.dev</span>]
            </span>
            <p
              style={{ marginTop: "0.75rem" }}
              className="font-mono text-xs text-[var(--color-muted)] leading-relaxed"
            >
              {t.footer.description}
            </p>
          </div>
          <div>
            <p
              className="font-mono text-xs text-[var(--color-muted)]"
              style={{ marginBottom: "0.75rem" }}
            >
              {t.footer.usefulLinks}
            </p>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {links.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-150"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p
              className="font-mono text-xs text-[var(--color-muted)]"
              style={{ marginBottom: "0.75rem" }}
            >
              {t.footer.contact}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-150"
              >
                github
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-150"
              >
                instagram
              </a>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-150"
              >
                whatsapp
              </a>
            </div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--color-border)" }}>
        <div
          className="wrap"
          style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        >
          <p className="font-mono text-xs text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} {profile.name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
