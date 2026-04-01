import { useState, useEffect } from "react";
import type { Project } from "@/entities/project";
import type { Translations } from "@/shared/i18n";
import { useScrollReveal } from "@/shared/hooks";
import { ArrowRight } from "lucide-react";

const platformLabels: Record<string, string> = {
  web: "web",
  mobile: "mobile",
  desktop: "desktop",
  cli: "cli",
};

type ProjectItemTranslation = { description: string; detailedDescription: string };

function getProjectTranslation(
  t: Translations,
  title: string
): ProjectItemTranslation | undefined {
  return (t.projects.items as Record<string, ProjectItemTranslation | undefined>)[title];
}

interface ProjectCardProps {
  project: Project;
  t: Translations;
}

export function ProjectCard({ project, t }: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const ref = useScrollReveal();
  const tr = getProjectTranslation(t, project.title);
  const description = tr?.description ?? project.description;
  const detailedDescription = tr?.detailedDescription ?? project.detailedDescription;

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <article
        ref={ref}
        onClick={() => setOpen(true)}
        className="page-section card-glow"
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === "Enter" && setOpen(true)}
        aria-label={`${t.projects.hint} ${project.title}`}
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          cursor: "pointer",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div
          style={{
            aspectRatio: "16/9",
            overflow: "hidden",
            backgroundColor: "var(--color-surface2)",
          }}
        >
          <img
            src={project.imageSrc}
            alt={project.title}
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.transform = "scale(1.04)")}
            onMouseLeave={e => ((e.target as HTMLElement).style.transform = "scale(1)")}
          />
        </div>
        <div style={{ padding: "1.1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--color-text)",
                letterSpacing: "-0.01em",
              }}
            >
              {project.title}
            </h2>
            <div style={{ display: "flex", gap: "0.3rem", flexShrink: 0 }}>
              {project.platforms.map(p => (
                <span
                  key={p}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--color-muted)",
                    border: "1px solid var(--color-border)",
                    padding: "0.15rem 0.4rem",
                    borderRadius: "var(--radius-xs)",
                    backgroundColor: "var(--color-surface2)",
                  }}
                >
                  {platformLabels[p]}
                </span>
              ))}
            </div>
          </div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--color-muted)",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>
        </div>
      </article>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backgroundColor: "rgb(0 0 0 / 0.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            animation: "fadeIn 0.15s ease forwards",
          }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <div
            style={{
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-2xl)",
              width: "100%",
              maxWidth: "36rem",
              maxHeight: "88vh",
              overflowY: "auto",
              boxShadow: "0 0 60px var(--color-accent-dim), 0 24px 48px rgb(0 0 0 / 0.3)",
            }}
            onClick={e => e.stopPropagation()}
          >
            <div
              style={{
                aspectRatio: "16/9",
                overflow: "hidden",
                borderRadius: "var(--radius-2xl) var(--radius-2xl) 0 0",
                position: "relative",
              }}
            >
              <img
                src={project.imageSrc}
                alt={project.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, var(--color-bg) 0%, transparent 50%)",
                }}
              />
            </div>

            <div style={{ padding: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--color-text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.title}
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t.projects.close}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--color-muted)",
                    background: "none",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.2rem 0.5rem",
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "color 0.15s ease, border-color 0.15s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-text)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                  }}
                >
                  esc
                </button>
              </div>

              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--color-muted)",
                  lineHeight: 1.75,
                  marginBottom: "1.5rem",
                }}
              >
                {detailedDescription}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--color-text)",
                  marginBottom: "0.75rem",
                  letterSpacing: "0.02em",
                }}
              >
                {t.projects.techUsed}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem" }}>
                {project.technologies.map(tech => (
                  <div
                    key={tech.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      padding: "0.3rem 0.6rem",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--color-surface)",
                    }}
                  >
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      style={{ width: "14px", height: "14px", objectFit: "contain" }}
                      loading="lazy"
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "var(--color-muted)",
                      }}
                    >
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-accent)",
                  textDecoration: "none",
                  padding: "0.5rem 1rem",
                  border: "1px solid var(--color-accent-dim)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-accent-dim)",
                  transition: "background-color 0.15s ease, box-shadow 0.15s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px var(--color-accent-dim)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {t.projects.github}
                <ArrowRight size={13} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}