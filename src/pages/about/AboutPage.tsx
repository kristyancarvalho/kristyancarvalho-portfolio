import { useScrollReveal } from "@/shared/hooks";
import type { Translations } from "@/shared/i18n";

const technologies = {
  frontend: {
    languages: "HTML, CSS, JavaScript, TypeScript, Lua",
    frameworks: "ReactJS, NextJS, Vite",
    styling: "Tailwind CSS, Styled-Components, Sass",
  },
  backend: {
    languages: "TypeScript, JavaScript, Golang",
    frameworks: "Express, Fastify",
    databases: "MongoDB, Firebase, SQLite",
  },
  tools: {
    vcs: "Git, GitHub",
    cicd: "GitHub Actions",
    orm: "Prisma",
    testing: "Jest",
    containers: "Docker, Kubernetes",
  },
};

interface TechCardProps {
  title: string;
  rows: { key: string; value: string }[];
  color?: string;
}

function TechCard({ title, rows, color }: TechCardProps) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="page-section card-glow"
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
        padding: "1.5rem",
        backgroundColor: "var(--color-surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color ?? "var(--color-accent-dim)"} 0%, transparent 70%)`,
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--color-accent)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}
      >
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {rows.map(({ key, value }) => (
          <div key={key} style={{ display: "flex", gap: "0.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--color-text)",
                minWidth: "3.5rem",
                flexShrink: 0,
              }}
            >
              {key}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--color-muted)",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface AboutPageProps {
  t: Translations;
}

export function AboutPage({ t }: AboutPageProps) {
  const titleRef = useScrollReveal();
  const bioRef = useScrollReveal();
  const journeyRef = useScrollReveal();
  const interestsRef = useScrollReveal();
  const techTitleRef = useScrollReveal();

  return (
    <div style={{ marginTop: "3.25rem", paddingTop: "4rem", paddingBottom: "5rem" }}>
      <div className="wrap">
        <div ref={titleRef} className="page-section" style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--color-accent)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            {t.about.title}
          </p>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "var(--color-text)",
            }}
          >
            Kristyan Carvalho
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
            marginBottom: "3.5rem",
          }}
        >
          <div
            ref={bioRef}
            className="page-section card-glow"
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              padding: "1.5rem",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--color-accent)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              bio
            </p>
            <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.75 }}>
              {t.about.bio}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div
              ref={journeyRef}
              className="page-section card-glow"
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xl)",
                padding: "1.5rem",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--color-accent)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                {t.about.journey}
              </p>
              <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.7 }}>
                {t.about.journeyText}
              </p>
            </div>

            <div
              ref={interestsRef}
              className="page-section card-glow"
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xl)",
                padding: "1.5rem",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--color-accent)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                {t.about.interests}
              </p>
              <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.7 }}>
                {t.about.interestsText}
              </p>
            </div>
          </div>
        </div>

        <div ref={techTitleRef} className="page-section" style={{ marginBottom: "1.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--color-accent)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            {t.about.techTitle}
          </p>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              color: "var(--color-text)",
            }}
          >
            Stack
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          <TechCard
            title={t.about.frontend}
            rows={[
              { key: "lang", value: technologies.frontend.languages },
              { key: "libs", value: technologies.frontend.frameworks },
              { key: "css", value: technologies.frontend.styling },
            ]}
          />
          <TechCard
            title={t.about.backend}
            color="var(--color-accent2-dim)"
            rows={[
              { key: "lang", value: technologies.backend.languages },
              { key: "libs", value: technologies.backend.frameworks },
              { key: "db", value: technologies.backend.databases },
            ]}
          />
          <TechCard
            title={t.about.tools}
            rows={[
              { key: "vcs", value: technologies.tools.vcs },
              { key: "ci/cd", value: technologies.tools.cicd },
              { key: "orm", value: technologies.tools.orm },
              { key: "test", value: technologies.tools.testing },
              { key: "infra", value: technologies.tools.containers },
            ]}
          />
        </div>
      </div>
    </div>
  );
}