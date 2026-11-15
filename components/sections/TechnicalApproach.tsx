import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { approachPrinciples } from "@/data/technicalApproach";

export function TechnicalApproach() {
  return (
    <section id="approach" className="scroll-mt-16 border-b border-border">
      <Container className="py-20 sm:py-24">
        <SectionHeading eyebrow="Approach" title="Technical Approach" />

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2">
          {approachPrinciples.map((principle, index) => (
            <StaggerItem key={principle.title}>
              <div className="flex gap-4">
                <span className="text-sm font-bold text-accent" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
