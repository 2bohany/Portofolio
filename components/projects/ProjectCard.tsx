import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/types/project";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { MediaPlaceholder } from "@/components/projects/MediaPlaceholder";
import { Badge } from "@/components/ui/Badge";
import { isPlaceholder } from "@/data/links";

export function ProjectCard({
  project,
  headingLevel = "h3",
}: {
  project: Project;
  /** h3 when nested under a section h2 (Featured Projects); h2 when the page's own h1 has no h2 between it and the cards (All Projects). */
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const cover = project.images[0];
  const hasDemo = !isPlaceholder(project.demoUrl);

  return (
    // The title link is stretched over the whole card (after: pseudo-element),
    // so the separate "Live Demo" link can sit on top without nesting anchors.
    <article className="group relative flex h-full flex-col border border-border bg-card transition-colors duration-200 hover:border-accent focus-within:border-accent">
      {cover ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border bg-muted">
          <Image
            src={cover}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <MediaPlaceholder className="aspect-[16/9] w-full border-x-0 border-t-0" />
      )}

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <Heading className="text-lg font-semibold text-card-foreground">
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-background"
            >
              {project.title}
            </Link>
          </Heading>
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

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
            {project.technologies.length > 4 ? <span>+{project.technologies.length - 4}</span> : null}
          </div>
          {hasDemo ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-xs font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              Live Demo
              <span className="sr-only"> of {project.title} (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
