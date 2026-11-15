import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { experienceRoles } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 border-b border-border bg-muted/30">
      <Container className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="Experience"
          title="Professional Experience"
          description="Where I've been building production software."
        />

        <ol className="mt-12 flex flex-col divide-y divide-border border-t border-border">
          {experienceRoles.map((role, index) => (
            <li key={`${role.company}-${role.period}`}>
            <Reveal tier="subtle" delay={index * 0.05} className="py-8">
              <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{role.role}</h3>
                  <p className="mt-1 text-sm font-medium text-accent">{role.company}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {role.period} · {role.location}
                  </p>
                </div>
                <div>
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-accent sm:text-base">
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.technologies.map((tech) => (
                      <Badge key={tech} tone="neutral">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
