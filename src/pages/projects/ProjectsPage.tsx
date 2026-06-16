import { projects } from "@/entities/project";
import { useProjectFilter } from "@/features/project-filter";
import type { SortOption } from "@/features/project-filter";
import { ProjectCard } from "./ProjectCard";
import { useScrollReveal } from "@/shared/hooks";
import { PageLottie } from "@/shared/ui";
import projectsScanAnimation from "@/shared/assets/lottie/projects-scan.json";
import type { Translations } from "@/shared/i18n";
import { Search, CircleOff } from "lucide-react";

interface ProjectsPageProps {
  t: Translations;
}

const platformLabels: Record<string, string> = {
  web: "web",
  mobile: "mobile",
  desktop: "desktop",
  cli: "cli",
};

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        padding: "0.25rem 0.65rem",
        borderRadius: "var(--radius-full)",
        border: `1px solid ${active ? "var(--color-accent)" : "var(--color-border)"}`,
        backgroundColor: active ? "var(--color-accent-dim)" : "var(--color-surface)",
        color: active ? "var(--color-accent)" : "var(--color-muted)",
        cursor: "pointer",
        transition: "all 0.15s ease",
        whiteSpace: "nowrap",
        letterSpacing: "0.02em",
      }}
      onMouseEnter={e => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
          (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
          (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
        }
      }}
    >
      {label}
    </button>
  );
}

export function ProjectsPage({ t }: ProjectsPageProps) {
  const {
    search,
    setSearch,
    platforms,
    togglePlatform,
    techs,
    toggleTech,
    sort,
    setSort,
    allPlatforms,
    allTechs,
    filtered,
    hasActiveFilters,
    clearFilters,
  } = useProjectFilter(projects);

  const headerRef = useScrollReveal();

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "default", label: t.projects.sortDefault },
    { value: "az", label: t.projects.sortAz },
    { value: "za", label: t.projects.sortZa },
  ];

  return (
    <div style={{ marginTop: "3.25rem", paddingTop: "4rem", paddingBottom: "5rem" }}>
      <div className="wrap">
        <div
          ref={headerRef}
          className="page-section"
          style={{ marginBottom: "2rem", position: "relative" }}
        >
          <PageLottie
            animationData={projectsScanAnimation}
            style={{
              position: "absolute",
              top: "-1rem",
              right: 0,
              width: "min(28vw, 12rem)",
              aspectRatio: "3 / 2",
              opacity: 0.58,
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
              marginBottom: "1.75rem",
              paddingRight: "min(30vw, 12rem)",
            }}
          >
            {t.projects.pageTitle}
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              padding: "1rem",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <div style={{ position: "relative", flex: "1", minWidth: "160px" }}>
                <Search
                  size={13}
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-muted)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t.projects.filterPlaceholder}
                  aria-label={t.projects.filterAriaLabel}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    backgroundColor: "var(--color-surface2)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "0.45rem 1rem 0.45rem 2rem",
                    color: "var(--color-text)",
                    width: "100%",
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

              <div
                style={{
                  display: "flex",
                  gap: "0.25rem",
                  padding: "0.2rem",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--color-surface2)",
                  flexShrink: 0,
                }}
              >
                {sortOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setSort(opt.value)}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.63rem",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "var(--radius-md)",
                      border: "none",
                      backgroundColor: sort === opt.value ? "var(--color-accent-dim)" : "transparent",
                      color: sort === opt.value ? "var(--color-accent)" : "var(--color-muted)",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {allPlatforms.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "var(--color-muted)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    flexShrink: 0,
                  }}
                >
                  {t.projects.platformLabel}
                </span>
                {allPlatforms.map(pl => (
                  <FilterChip
                    key={pl}
                    label={platformLabels[pl] ?? pl}
                    active={platforms.includes(pl)}
                    onClick={() => togglePlatform(pl)}
                  />
                ))}
              </div>
            )}

            {allTechs.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "var(--color-muted)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    flexShrink: 0,
                  }}
                >
                  {t.projects.techLabel}
                </span>
                {allTechs.map(tech => (
                  <FilterChip
                    key={tech}
                    label={tech}
                    active={techs.includes(tech)}
                    onClick={() => toggleTech(tech)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            minHeight: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--color-muted)",
            }}
          >
            {filtered.length === projects.length
              ? t.projects.hint
              : `${filtered.length} / ${projects.length} ${t.projects.projectsLabel}`}
          </p>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--color-muted)",
                background: "none",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "0.2rem 0.6rem",
                cursor: "pointer",
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
              {t.projects.clearFilters}
            </button>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
            gap: "1rem",
          }}
        >
          {filtered.length > 0 ? (
            filtered.map(project => (
              <ProjectCard key={project.title} project={project} t={t} />
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "4rem 1rem",
                gap: "0.5rem",
              }}
            >
              <CircleOff size={24} style={{ color: "var(--color-muted)", opacity: 0.4 }} />
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-muted)",
                }}
              >
                {t.projects.noResults}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--color-muted)",
                  opacity: 0.6,
                }}
              >
                {t.projects.noResultsHint}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
