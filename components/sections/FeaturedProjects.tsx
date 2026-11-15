import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getFeaturedProjects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section id="projects" className="scroll-mt-16 border-b border-border">
      <Container className="py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Work"
            title="Featured Projects"
            description="A closer look at the most substantial builds — full case studies with architecture and contribution details."
          />
          <Button href="/projects" variant="outline">
            All Projects
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2">
          {featured.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
