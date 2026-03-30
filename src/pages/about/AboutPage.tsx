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

interface AboutPageProps {
  t: Translations;
}

export function AboutPage({ t }: AboutPageProps) {
  return (
    <div
      style={{ marginTop: "3rem", paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <div className="wrap">
        <h1
          className="font-mono text-2xl text-[var(--color-text)]"
          style={{ marginBottom: "2.5rem" }}
        >
          <span className="text-[var(--color-accent)]">&gt;</span>{" "}
          {t.about.title}
        </h1>
        <section
          style={{
            marginBottom: "3rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <p className="font-mono text-sm text-[var(--color-muted)] leading-relaxed">
            {t.about.bio}
          </p>
          <div>
            <p
              className="font-mono text-xs text-[var(--color-accent)]"
              style={{ marginBottom: "0.5rem" }}
            >
              // {t.about.journey}
            </p>
            <p className="font-mono text-sm text-[var(--color-muted)] leading-relaxed">
              {t.about.journeyText}
            </p>
          </div>
          <div>
            <p
              className="font-mono text-xs text-[var(--color-accent)]"
              style={{ marginBottom: "0.5rem" }}
            >
              // {t.about.interests}
            </p>
            <p className="font-mono text-sm text-[var(--color-muted)] leading-relaxed">
              {t.about.interestsText}
            </p>
          </div>
        </section>
        <section>
          <h2
            className="font-mono text-lg text-[var(--color-text)]"
            style={{ marginBottom: "1.5rem" }}
          >
            <span className="text-[var(--color-accent)]">&gt;</span>{" "}
            {t.about.techTitle}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "1rem",
              }}
            >
              <p
                className="font-mono text-xs text-[var(--color-accent)]"
                style={{ marginBottom: "0.75rem" }}
              >
                {t.about.frontend}
              </p>
              <div
                className="font-mono text-xs text-[var(--color-muted)]"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.375rem",
                }}
              >
                <p>
                  <span className="text-[var(--color-text)]">lang</span>:{" "}
                  {technologies.frontend.languages}
                </p>
                <p>
                  <span className="text-[var(--color-text)]">libs</span>:{" "}
                  {technologies.frontend.frameworks}
                </p>
                <p>
                  <span className="text-[var(--color-text)]">css</span>:{" "}
                  {technologies.frontend.styling}
                </p>
              </div>
            </div>
            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "1rem",
              }}
            >
              <p
                className="font-mono text-xs text-[var(--color-accent)]"
                style={{ marginBottom: "0.75rem" }}
              >
                {t.about.backend}
              </p>
              <div
                className="font-mono text-xs text-[var(--color-muted)]"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.375rem",
                }}
              >
                <p>
                  <span className="text-[var(--color-text)]">lang</span>:{" "}
                  {technologies.backend.languages}
                </p>
                <p>
                  <span className="text-[var(--color-text)]">libs</span>:{" "}
                  {technologies.backend.frameworks}
                </p>
                <p>
                  <span className="text-[var(--color-text)]">db</span>:{" "}
                  {technologies.backend.databases}
                </p>
              </div>
            </div>
            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "1rem",
              }}
            >
              <p
                className="font-mono text-xs text-[var(--color-accent)]"
                style={{ marginBottom: "0.75rem" }}
              >
                {t.about.tools}
              </p>
              <div
                className="font-mono text-xs text-[var(--color-muted)]"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.375rem",
                }}
              >
                <p>
                  <span className="text-[var(--color-text)]">vcs</span>:{" "}
                  {technologies.tools.vcs}
                </p>
                <p>
                  <span className="text-[var(--color-text)]">ci/cd</span>:{" "}
                  {technologies.tools.cicd}
                </p>
                <p>
                  <span className="text-[var(--color-text)]">orm</span>:{" "}
                  {technologies.tools.orm}
                </p>
                <p>
                  <span className="text-[var(--color-text)]">test</span>:{" "}
                  {technologies.tools.testing}
                </p>
                <p>
                  <span className="text-[var(--color-text)]">infra</span>:{" "}
                  {technologies.tools.containers}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
