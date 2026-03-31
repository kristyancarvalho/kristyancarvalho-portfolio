import { useState, useEffect } from "react";
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
        pointerEvents: "none",
        willChange: "transform",
        ...style,
      }}
    />
  );
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: string }) {
  return (
    <div
      className="animate-fade-up card-surface"
      style={{
        animationDelay: delay,
        padding: "1.25rem 1.5rem",
        minWidth: "8rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, var(--color-accent-dim) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <p
        style={{
          fontSize: "1.875rem",
          fontWeight: 800,
          color: "var(--color-text)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontSize: "0.68rem",
          color: "var(--color-muted)",
          marginTop: "0.375rem",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </p>
    </div>
  );
}

function SocialRow({ isMobile }: { isMobile: boolean }) {
  const { github, instagram, whatsapp } = profile;
  const items = [
    { label: "github", href: github },
    { label: "instagram", href: instagram },
    { label: "whatsapp", href: whatsapp },
  ];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        justifyContent: isMobile ? "center" : "flex-start",
      }}
    >
      {items.map(({ label, href }) => (
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
            letterSpacing: "0.03em",
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div
      style={{
        minHeight: "calc(100svh - 3.5rem)",
        marginTop: "3.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GlowOrb
        style={{
          width: "600px",
          height: "600px",
          top: "-200px",
          right: "-150px",
          background: "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 65%)",
          filter: "blur(40px)",
          opacity: 0.5,
        }}
      />
      <GlowOrb
        style={{
          width: "400px",
          height: "400px",
          bottom: "0",
          left: "-150px",
          background: "radial-gradient(circle, var(--color-secondary-glow) 0%, transparent 65%)",
          filter: "blur(50px)",
          opacity: 0.3,
        }}
      />

      <div className="wrap grid-dots" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div
          style={{
            maxWidth: "44rem",
            position: "relative",
            margin: isMobile ? "0 auto" : undefined,
            textAlign: isMobile ? "center" : undefined,
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
          }}
        >
          <div className="animate-fade-up" style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.35rem 1rem 0.35rem 0.625rem",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-full)",
                backgroundColor: "color-mix(in oklch, var(--color-surface) 80%, transparent)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="glow-dot" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--color-muted)",
                  letterSpacing: "0.04em",
                }}
              >
                {t.home.greeting}
              </span>
            </div>
          </div>

          <h1
            className="animate-fade-up delay-1"
            style={{
              fontSize: "clamp(2rem, 8vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.05em",
              color: "var(--color-text)",
              marginBottom: "1.75rem",
            }}
          >
            {t.home.role.replace(".", "")}
            <span
              style={{
                display: "inline-block",
                width: "0.1em",
                height: "0.85em",
                background: "linear-gradient(180deg, var(--color-accent), oklch(0.65 0.24 300))",
                marginLeft: "0.12em",
                verticalAlign: "text-bottom",
                borderRadius: "2px",
                boxShadow: "0 0 20px var(--color-accent-glow)",
                animation: "glowPulse 1.4s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
          </h1>

          <div
            ref={bioRef}
            className="page-section"
            style={{
              marginBottom: "2.75rem",
              width: "100%",
            }}
          >
            <p
              style={{
                fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
                color: "var(--color-muted)",
                lineHeight: 1.75,
                maxWidth: "36rem",
                fontWeight: 400,
              }}
            >
              {t.home.bio}
            </p>
          </div>

          <div ref={ctaRef} className="page-section" style={{ marginBottom: "3.5rem", width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.875rem",
                marginBottom: "2.25rem",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <a href={profile.cvUrl} download>
                <Button variant="glow" size="md">{t.home.downloadCv}</Button>
              </a>
              <Link to="/projetos">
                <Button variant="outline" size="md">{t.home.viewProjects}</Button>
              </Link>
            </div>
            <SocialRow isMobile={isMobile} />
          </div>

          <div
            ref={statsRef}
            className="page-section"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.875rem",
              justifyContent: isMobile ? "center" : "flex-start",
              width: "100%",
            }}
          >
            <StatCard value={t.home.stat1Value} label={t.home.stat1Label} delay="0s" />
            <StatCard value={t.home.stat2Value} label={t.home.stat2Label} delay="0.07s" />
            <StatCard value={t.home.stat3Value} label={t.home.stat3Label} delay="0.14s" />
          </div>
        </div>
      </div>
    </div>
  );
}