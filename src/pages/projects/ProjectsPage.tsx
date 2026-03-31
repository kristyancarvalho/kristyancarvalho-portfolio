import { projects } from "@/entities/project";
import { useProjectFilter } from "@/features/project-filter";
import { ProjectCard } from "./ProjectCard";
import { useScrollReveal } from "@/shared/hooks";
import type { Translations } from "@/shared/i18n";

interface ProjectsPageProps {
  t: Translations;
}

export function ProjectsPage({ t }: ProjectsPageProps) {
  const { search, setSearch, filtered } = useProjectFilter(projects);
  const headerRef = useScrollReveal();

  return (
    <div style={{ marginTop: "3.25rem", paddingTop: "4rem", paddingBottom: "5rem" }}>
      <div className="wrap">
        <div
          ref={headerRef}
          className="page-section"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--color-accent)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "0.375rem",
              }}
            >
              {t.projects.title}
            </p>
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: "var(--color-text)",
              }}
            >
              Projects
            </h1>
          </div>

          <div style={{ position: "relative" }}>
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.projects.filterPlaceholder}
              aria-label={t.projects.filterAriaLabel}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "0.5rem 1rem",
                color: "var(--color-text)",
                width: "13rem",
                outline: "none",
                transition: "border-color 0.15s ease, box-shadow 0.15s ease",
              }}
              onFocus={e => {
                e.target.style.borderColor = "var(--color-accent)";
                e.target.style.boxShadow = "0 0 0 3px var(--color-accent-dim)";
              }}
              onBlur={e => {
                e.target.style.borderColor = "var(--color-border)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-muted)",
            marginBottom: "1.5rem",
          }}
        >
          {t.projects.hint}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
            gap: "1rem",
          }}
        >
          {filtered.map(project => (
            <ProjectCard key={project.title} project={project} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}