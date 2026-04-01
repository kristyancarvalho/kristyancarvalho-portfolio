import { useState, useMemo } from "react";
import type { Project } from "@/entities/project";

export type SortOption = "default" | "az" | "za";

export interface ProjectFilters {
  search: string;
  platforms: string[];
  techs: string[];
  sort: SortOption;
}

export function useProjectFilter(projects: Project[]) {
  const [search, setSearch] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [techs, setTechs] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("default");

  const allPlatforms = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => p.platforms.forEach(pl => set.add(pl)));
    return Array.from(set).sort();
  }, [projects]);

  const allTechs = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => p.technologies.forEach(t => set.add(t.name)));
    return Array.from(set).sort();
  }, [projects]);

  const togglePlatform = (platform: string) => {
    setPlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const toggleTech = (tech: string) => {
    setTechs(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setPlatforms([]);
    setTechs([]);
    setSort("default");
  };

  const hasActiveFilters = search.trim() !== "" || platforms.length > 0 || techs.length > 0 || sort !== "default";

  const filtered = useMemo(() => {
    let result = projects;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies.some(t => t.name.toLowerCase().includes(q))
      );
    }

    if (platforms.length > 0) {
      result = result.filter(p =>
        platforms.every(pl => p.platforms.includes(pl))
      );
    }

    if (techs.length > 0) {
      result = result.filter(p =>
        techs.every(tech => p.technologies.some(t => t.name === tech))
      );
    }

    if (sort === "az") result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") result = [...result].sort((a, b) => b.title.localeCompare(a.title));

    return result;
  }, [projects, search, platforms, techs, sort]);

  return {
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
  };
}