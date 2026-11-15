"use client";

import { cn } from "@/lib/utils";
import { allCategories } from "@/data/projects";
import type { ProjectStatus } from "@/types/project";

const statusOptions: Array<ProjectStatus | "All Statuses"> = [
  "All Statuses",
  "Live",
  "Completed",
  "In Development",
  "Prototype",
  "Coming Soon",
];

export function ProjectFilters({
  activeCategory,
  onCategoryChange,
  activeStatus,
  onStatusChange,
  resultCount,
}: {
  activeCategory: (typeof allCategories)[number];
  onCategoryChange: (category: (typeof allCategories)[number]) => void;
  activeStatus: ProjectStatus | "All Statuses";
  onStatusChange: (status: ProjectStatus | "All Statuses") => void;
  resultCount: number;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        {allCategories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "min-h-9 cursor-pointer border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "border-primary bg-primary text-on-primary"
                  : "border-border bg-transparent text-muted-foreground hover:border-primary hover:text-foreground"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Status
          <select
            value={activeStatus}
            onChange={(e) => onStatusChange(e.target.value as ProjectStatus | "All Statuses")}
            className="min-h-9 cursor-pointer border border-border bg-card px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <p className="text-sm text-muted-foreground" aria-live="polite">
          {resultCount} {resultCount === 1 ? "project" : "projects"}
        </p>
      </div>
    </div>
  );
}
