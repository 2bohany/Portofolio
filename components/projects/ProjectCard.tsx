import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { MediaPlaceholder } from "@/components/projects/MediaPlaceholder";
import { Badge } from "@/components/ui/Badge";

export function ProjectCard({
  project,
  headingLevel = "h3",
}: {
  project: Project;
  /** h3 when nested under a section h2 (Featured Projects); h2 when the page's own h1 has no h2 between it and the cards (All Projects). */
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col border border-border bg-card transition-colors duration-200 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <MediaPlaceholder className="h-40 w-full" />

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <Heading className="text-lg font-semibold text-card-foreground">{project.title}</Heading>
          <ArrowUpRight
            className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            aria-hidden
          />
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{project.tagline}</p>

        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          {project.category.slice(0, 2).map((cat) => (
            <Badge key={cat} tone="neutral">
              {cat}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-2 text-xs text-muted-foreground">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
          {project.technologies.length > 4 ? <span>+{project.technologies.length - 4}</span> : null}
        </div>
      </div>
    </Link>
  );
}
