import { projects } from "@/entities/project";
import { useProjectFilter } from "@/features/project-filter";
import { ProjectCard } from "./ProjectCard";
import type { Translations } from "@/shared/i18n";

interface ProjectsPageProps {
  t: Translations;
}

export function ProjectsPage({ t }: ProjectsPageProps) {
  const { search, setSearch, filtered } = useProjectFilter(projects);

  return (
    <div
      style={{ marginTop: "3rem", paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <div className="wrap">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <h1 className="font-mono text-2xl text-[var(--color-text)]">
            <span className="text-[var(--color-accent)]">&gt;</span>{" "}
            {t.projects.title}
          </h1>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="filter..."
            aria-label="Filtrar projetos"
            className="font-mono text-xs bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-3 py-2 text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            style={{ width: "12rem" }}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1rem",
          }}
        >
          {filtered.map((project) => (
            <ProjectCard key={project.title} project={project} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
