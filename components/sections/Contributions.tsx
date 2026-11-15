import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { getContributionGroups } from "@/lib/contributions";
import { getProjectBySlug } from "@/data/projects";

export function Contributions() {
  const groups = getContributionGroups();

  return (
    <section id="contributions" className="scroll-mt-16 border-b border-border bg-muted/30">
      <Container className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="Contributions"
          title="Where I Contributed"
          description="A breakdown of the kind of work I actually did on each project — not a claim of sole authorship where that isn't the case."
        />

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <StaggerItem key={group.label}>
              <div className="h-full border border-border bg-card p-5">
                <p className="text-sm font-semibold text-card-foreground">{group.label}</p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                  {group.projectSlugs.map((slug) => {
                    const project = getProjectBySlug(slug);
                    if (!project) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/projects/${slug}`}
                        className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {project.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
