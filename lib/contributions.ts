import { projects } from "@/data/projects";

export interface ContributionGroup {
  label: string;
  projectSlugs: string[];
}

/**
 * Aggregates the real per-project "contribution" tags into site-level
 * groups for the homepage Contributions section — computed from
 * data/projects.ts rather than hand-authored, so it can't drift out of
 * sync with what each project actually states.
 */
export function getContributionGroups(): ContributionGroup[] {
  const map = new Map<string, Set<string>>();

  for (const project of projects) {
    for (const contribution of project.contribution) {
      if (!map.has(contribution)) map.set(contribution, new Set());
      map.get(contribution)!.add(project.slug);
    }
  }

  return Array.from(map.entries())
    .map(([label, slugs]) => ({ label, projectSlugs: Array.from(slugs) }))
    .sort((a, b) => b.projectSlugs.length - a.projectSlugs.length);
}
