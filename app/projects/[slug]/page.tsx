import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { DetailSection } from "@/components/projects/DetailSection";
import { ProjectFeatures } from "@/components/projects/ProjectFeatures";
import { TechStack } from "@/components/projects/TechStack";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { ContributionSection } from "@/components/projects/ContributionSection";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const hasProblemSolution = Boolean(project.problem || project.solution);

  return (
    <>
      <ProjectHero project={project} />

      {hasProblemSolution ? (
        <DetailSection title="Problem & Solution" muted>
          <div className="grid gap-8 sm:grid-cols-2">
            {project.problem ? (
              <div>
                <p className="text-sm font-semibold text-foreground">Problem</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
              </div>
            ) : null}
            {project.solution ? (
              <div>
                <p className="text-sm font-semibold text-foreground">Solution</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.solution}</p>
              </div>
            ) : null}
          </div>
        </DetailSection>
      ) : null}

      <DetailSection title="Features">
        <ProjectFeatures features={project.features} />
      </DetailSection>

      <DetailSection title="Technology" muted>
        <TechStack technologies={project.technologies} />
      </DetailSection>

      <DetailSection title="Architecture">
        <ArchitectureDiagram steps={project.architecture} />
      </DetailSection>

      <DetailSection title="My Contribution" muted>
        <ContributionSection contribution={project.contribution} />
      </DetailSection>

      {project.technicalApproach || (project.challenges && project.challenges.length > 0) ? (
        <DetailSection title="Technical Approach & Challenges">
          {project.technicalApproach ? (
            <p className="text-sm leading-relaxed text-muted-foreground">{project.technicalApproach}</p>
          ) : null}
          {project.challenges && project.challenges.length > 0 ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {project.challenges.map((challenge) => (
                <li key={challenge}>{challenge}</li>
              ))}
            </ul>
          ) : null}
        </DetailSection>
      ) : null}

      <DetailSection title="Screenshots & Demo" muted>
        <ProjectGallery images={project.images} demoVideo={project.demoVideo} />
      </DetailSection>
    </>
  );
}
