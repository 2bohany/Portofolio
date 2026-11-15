"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectStatus } from "@/types/project";
import { allCategories } from "@/data/projects";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<(typeof allCategories)[number]>("All");
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | "All Statuses">("All Statuses");

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category.includes(activeCategory as never);
      const matchesStatus = activeStatus === "All Statuses" || project.status === activeStatus;
      return matchesCategory && matchesStatus;
    });
  }, [projects, activeCategory, activeStatus]);

  return (
    <div className="flex flex-col gap-8">
      <ProjectFilters
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <p className="border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No projects match these filters yet.
        </p>
      ) : (
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} headingLevel="h2" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}
