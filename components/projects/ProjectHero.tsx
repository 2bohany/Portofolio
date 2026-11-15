import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/types/project";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { MediaPlaceholder } from "@/components/projects/MediaPlaceholder";
import { DemoLinkButton, GithubLinkButton } from "@/components/projects/ProjectLinkButtons";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <Container as="section" className="py-12 sm:py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All Projects
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
        {project.category.map((cat) => (
          <Badge key={cat} tone="neutral">
            {cat}
          </Badge>
        ))}
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <DemoLinkButton demoUrl={project.demoUrl} />
        <GithubLinkButton githubUrl={project.githubUrl} />
      </div>

      <MediaPlaceholder label="Hero media coming soon" className="mt-10 h-72 w-full sm:h-96" />
    </Container>
  );
}
