import { PageLottie } from "@/shared/ui";
import { useScrollReveal } from "@/shared/hooks";
import aboutNodesAnimation from "@/shared/assets/lottie/about-nodes.json";
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
  accentColor?: string;
}

function TechCard({ title, rows, accentColor }: TechCardProps) {
  const ref = useScrollReveal();
  const color = accentColor ?? "var(--color-accent-dim)";
  return (
    <div
      ref={ref}
      className="page-section card-surface"
      style={{
        padding: "1.5rem",
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
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: "blur(24px)",
          pointerEvents: "none",
        }}
      />
      <p className="label-tag" style={{ marginBottom: "1.25rem" }}>{title}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {rows.map(({ key, value }) => (
          <div key={key} style={{ display: "flex", gap: "0.75rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--color-text)",
                minWidth: "3.75rem",
                flexShrink: 0,
                fontWeight: 500,
              }}
            >
              {key}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--color-muted)",
                lineHeight: 1.6,
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
    <div style={{ marginTop: "3.5rem", paddingTop: "4.5rem", paddingBottom: "5.5rem" }}>
      <div className="wrap">
        <div
          ref={titleRef}
          className="page-section"
          style={{
            marginBottom: "3.5rem",
            position: "relative",
            minHeight: "8rem",
            paddingRight: "min(34vw, 14rem)",
          }}
        >
          <PageLottie
            animationData={aboutNodesAnimation}
            style={{
              position: "absolute",
              right: 0,
              top: "-1.25rem",
              width: "min(32vw, 13rem)",
              aspectRatio: "11 / 8",
              opacity: 0.68,
              pointerEvents: "none",
            }}
          />
          <p className="label-tag" style={{ marginBottom: "0.875rem" }}>
            {t.about.title}
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--color-text)",
              lineHeight: 1.1,
            }}
          >
            Kristyan Carvalho
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "1.25rem",
            marginBottom: "4rem",
          }}
        >
          <div
            ref={bioRef}
            className="page-section card-surface"
            style={{ padding: "1.75rem", position: "relative", overflow: "hidden" }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "radial-gradient(circle, var(--color-accent-dim) 0%, transparent 70%)",
                filter: "blur(30px)",
                pointerEvents: "none",
              }}
            />
            <p className="label-tag" style={{ marginBottom: "1rem" }}>bio</p>
            <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.8 }}>
              {t.about.bio}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div
              ref={journeyRef}
              className="page-section card-surface"
              style={{ padding: "1.75rem" }}
            >
              <p className="label-tag" style={{ marginBottom: "1rem" }}>{t.about.journey}</p>
              <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.75 }}>
                {t.about.journeyText}
              </p>
            </div>

            <div
              ref={interestsRef}
              className="page-section card-surface"
              style={{ padding: "1.75rem" }}
            >
              <p className="label-tag" style={{ marginBottom: "1rem" }}>{t.about.interests}</p>
              <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.75 }}>
                {t.about.interestsText}
              </p>
            </div>
          </div>
        </div>

        <div ref={techTitleRef} className="page-section" style={{ marginBottom: "1.75rem" }}>
          <p className="label-tag" style={{ marginBottom: "0.6rem" }}>{t.about.techTitle}</p>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "var(--color-text)",
            }}
          >
            Stack
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.125rem",
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
            accentColor="var(--color-secondary-dim)"
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
