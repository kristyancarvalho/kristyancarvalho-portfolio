import { Link } from "react-router-dom";
import type { Translations } from "@/shared/i18n";

interface NotFoundPageProps {
  t: Translations;
}

export function NotFoundPage({ t }: NotFoundPageProps) {
  return (
    <div
      style={{
        minHeight: "calc(100svh - 3.25rem)",
        marginTop: "3.25rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />
      <p
        className="animate-fade-up"
        style={{
          fontSize: "6rem",
          fontWeight: 700,
          letterSpacing: "-0.06em",
          color: "var(--color-accent)",
          lineHeight: 1,
          textShadow: "0 0 40px var(--color-accent-glow)",
          marginBottom: "1rem",
        }}
      >
        {t.notFound.code}
      </p>
      <p
        className="animate-fade-up delay-1"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.875rem",
          color: "var(--color-muted)",
          marginBottom: "2rem",
        }}
      >
        {t.notFound.message}
      </p>
      <Link
        to="/"
        className="animate-fade-up delay-2"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--color-accent)",
          textDecoration: "none",
          padding: "0.5rem 1.25rem",
          border: "1px solid var(--color-accent-dim)",
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--color-accent-dim)",
          transition: "box-shadow 0.15s ease",
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px var(--color-accent-dim)")}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
      >
        ← {t.notFound.back}
      </Link>
    </div>
  );
}