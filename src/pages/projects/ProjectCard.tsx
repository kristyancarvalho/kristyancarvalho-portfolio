import { useState } from "react";
import type { Project } from "@/entities/project";
import type { Translations } from "@/shared/i18n";

const platformLabels: Record<string, string> = { web: "web", mobile: "mobile", desktop: "desktop", cli: "cli" };

interface ProjectCardProps {
  project: Project;
  t: Translations;
}

export function ProjectCard({ project, t }: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article
        onClick={() => setOpen(true)}
        className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden cursor-pointer hover:border-[var(--color-accent)] transition-colors duration-150 group"
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === "Enter" && setOpen(true)}
        aria-label={`Ver detalhes de ${project.title}`}
      >
        <div className="aspect-video overflow-hidden bg-[var(--color-surface)]">
          <img src={project.imageSrc} alt={project.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h2 className="font-mono text-sm font-bold text-[var(--color-text)]">{project.title}</h2>
            <div className="flex gap-1 flex-shrink-0">
              {project.platforms.map(p => (
                <span key={p} className="font-mono text-[10px] text-[var(--color-muted)] border border-[var(--color-border)] px-1.5 py-0.5 rounded-[var(--radius-sm)]">{platformLabels[p]}</span>
              ))}
            </div>
          </div>
          <p className="font-mono text-xs text-[var(--color-muted)] leading-relaxed line-clamp-2">{project.description}</p>
        </div>
      </article>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={project.title}>
          <div className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[var(--radius-lg)] w-full max-w-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <img src={project.imageSrc} alt={project.title} className="w-full aspect-video object-cover rounded-t-[var(--radius-lg)]" />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="font-mono text-base font-bold text-[var(--color-text)]">{project.title}</h2>
                <button onClick={() => setOpen(false)} aria-label="Fechar" className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">[esc]</button>
              </div>
              <p className="font-mono text-xs text-[var(--color-muted)] leading-relaxed mb-6">{project.detailedDescription}</p>
              <p className="font-mono text-xs text-[var(--color-text)] mb-3">{t.projects.techUsed}</p>
              <div className="flex flex-wrap gap-3 mb-6">
                {project.technologies.map(tech => (
                  <div key={tech.name} className="flex items-center gap-1.5">
                    <img src={tech.logo} alt={tech.name} className="w-4 h-4 object-contain" loading="lazy" />
                    <span className="font-mono text-xs text-[var(--color-muted)]">{tech.name}</span>
                  </div>
                ))}
              </div>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[var(--color-accent)] hover:underline">{t.projects.github} →</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
