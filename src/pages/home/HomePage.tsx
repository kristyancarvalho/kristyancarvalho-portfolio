import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";
import { profile } from "@/entities/profile";
import { useScrollReveal } from "@/shared/hooks";
import type { Translations } from "@/shared/i18n";

interface HomePageProps {
  t: Translations;
}

function GlowOrb({ style }: { style: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        borderRadius: "50%",
        background: "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)",
        filter: "blur(48px)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

function StatCard({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: string;
}) {
  return (
    <div
      className="animate-fade-up card-glow"
      style={{
        animationDelay: delay,
        padding: "1rem 1.25rem",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        backgroundColor: "var(--color-surface)",
        minWidth: "7rem",
      }}
    >
      <p
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "var(--color-text)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontSize: "0.7rem",
          color: "var(--color-muted)",
          marginTop: "0.25rem",
          fontFamily: "var(--font-mono)",
        }}
      >
        {label}
      </p>
    </div>
  );
}

function SocialRow() {
  const { github, instagram, whatsapp } = profile;
  const items = [
    { label: "github", href: github },
    { label: "instagram", href: instagram },
    { label: "whatsapp", href: whatsapp },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
      {items.map(({ label, href }) => (
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
  );
}

export function HomePage({ t }: HomePageProps) {
  const statsRef = useScrollReveal();
  const bioRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div
      style={{
        minHeight: "calc(100svh - 3.25rem)",
        marginTop: "3.25rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GlowOrb
        style={{ width: "560px", height: "560px", top: "-140px", right: "-120px", opacity: 0.35 }}
      />
      <GlowOrb
        style={{
          width: "320px",
          height: "320px",
          bottom: "8%",
          left: "-100px",
          opacity: 0.18,
          background: "radial-gradient(circle, var(--color-accent2-glow) 0%, transparent 70%)",
        }}
      />

      <div className="wrap grid-bg" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div style={{ maxWidth: "42rem", position: "relative" }}>
          <div className="animate-fade-up" style={{ marginBottom: "1.25rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.3rem 0.75rem",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <span className="glow-dot" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--color-muted)",
                  letterSpacing: "0.02em",
                }}
              >
                {t.home.greeting}
              </span>
            </div>
          </div>

          <h1
            className="animate-fade-up delay-1"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.25rem)",
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              color: "var(--color-text)",
              marginBottom: "1.5rem",
            }}
          >
            {t.home.role.replace(".", "")}
            <span
              style={{
                display: "inline-block",
                width: "0.12em",
                height: "0.9em",
                backgroundColor: "var(--color-accent)",
                marginLeft: "0.1em",
                verticalAlign: "text-bottom",
                borderRadius: "1px",
                boxShadow: "0 0 16px var(--color-accent-glow)",
                animation: "glowPulse 1.2s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
          </h1>

          <div ref={bioRef} className="page-section" style={{ marginBottom: "2.5rem" }}>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--color-muted)",
                lineHeight: 1.7,
                maxWidth: "34rem",
              }}
            >
              {t.home.bio}
            </p>
          </div>

          <div ref={ctaRef} className="page-section" style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem" }}>
              <a href={profile.cvUrl} download>
                <Button variant="glow" size="md">{t.home.downloadCv}</Button>
              </a>
              <Link to="/projetos">
                <Button variant="outline" size="md">{t.home.viewProjects}</Button>
              </Link>
            </div>
            <SocialRow />
          </div>

          <div
            ref={statsRef}
            className="page-section"
            style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
          >
            <StatCard value={t.home.stat1Value} label={t.home.stat1Label} delay="0s" />
            <StatCard value={t.home.stat2Value} label={t.home.stat2Label} delay="0.06s" />
            <StatCard value={t.home.stat3Value} label={t.home.stat3Label} delay="0.12s" />
          </div>
        </div>
      </div>
    </div>
  );
}