import { Link } from "react-router-dom";
import { PageLottie } from "@/shared/ui";
import notFoundSignalAnimation from "@/shared/assets/lottie/not-found-signal.json";
import type { Translations } from "@/shared/i18n";

interface NotFoundPageProps {
  t: Translations;
}

export function NotFoundPage({ t }: NotFoundPageProps) {
  return (
    <div
      style={{
        minHeight: "calc(100svh - 3.5rem)",
        marginTop: "3.5rem",
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
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-cyan-glow) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.15,
          bottom: "10%",
          left: "10%",
          pointerEvents: "none",
        }}
      />

      <p className="label animate-fade-up" style={{ marginBottom: "1.25rem" }}>
        {t.notFound.label}
      </p>

      <p
        className="animate-fade-up delay-1"
        style={{
          fontSize: "clamp(5rem, 18vw, 10rem)",
          fontWeight: 800,
          letterSpacing: "-0.06em",
          lineHeight: 1,
          marginBottom: "1.25rem",
          position: "relative",
        }}
      >
        <PageLottie
          animationData={notFoundSignalAnimation}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "clamp(10rem, 32vw, 17rem)",
            aspectRatio: "1 / 1",
            transform: "translate(-50%, -50%)",
            opacity: 0.42,
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
        <span className="gradient-text">{t.notFound.code}</span>
      </p>

      <p
        className="animate-fade-up delay-2"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.875rem",
          color: "var(--color-muted)",
          marginBottom: "2.5rem",
        }}
      >
        {t.notFound.message}
      </p>

      <Link
        to="/"
        className="animate-fade-up delay-3"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "white",
          textDecoration: "none",
          padding: "0.6rem 1.5rem",
          border: "1px solid transparent",
          borderRadius: "var(--radius-full)",
          backgroundColor: "var(--color-primary)",
          boxShadow: "0 0 24px var(--color-primary-glow)",
          transition: "box-shadow 0.2s ease, background-color 0.2s ease",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px var(--color-primary-glow)";
          (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary-hover)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px var(--color-primary-glow)";
          (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary)";
        }}
      >
        ← {t.notFound.back}
      </Link>
    </div>
  );
}
