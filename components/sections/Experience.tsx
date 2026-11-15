import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { experienceHighlights } from "@/data/experience";
import { getProjectBySlug } from "@/data/projects";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 border-b border-border bg-muted/30">
      <Container className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="Experience"
          title="Practical Experience"
          description="Experience gained through building the projects in this portfolio, grouped by area of work."
        />

        <div className="mt-12 flex flex-col divide-y divide-border border-t border-border">
          {experienceHighlights.map((highlight, index) => (
            <Reveal key={highlight.area} tier="subtle" delay={index * 0.05} className="py-8">
              <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
                <h3 className="text-lg font-semibold text-foreground">{highlight.area}</h3>
                <div>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {highlight.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {highlight.technologies.map((tech) => (
                      <Badge key={tech} tone="neutral">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                    {highlight.relatedProjectSlugs.map((slug) => {
                      const project = getProjectBySlug(slug);
                      if (!project) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/projects/${slug}`}
                          className="text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {project.title} →
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
