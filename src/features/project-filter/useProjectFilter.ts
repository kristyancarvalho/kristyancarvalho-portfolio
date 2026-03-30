import { useState, useMemo } from "react";
import type { Project } from "@/entities/project";

export function useProjectFilter(projects: Project[]) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return projects;
    const q = search.toLowerCase();
    return projects.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [projects, search]);

  return { search, setSearch, filtered };
}
