import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Skills3D } from "@/components/three/Scene3D";
import { skillGroups, sphereSkills } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 border-b border-border bg-muted/30">
      <Container className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="Skills"
          title="Technical Skills"
          description="The stack I use day to day across web, desktop and ERP work."
        />

        <Reveal tier="standard" className="mt-10 border border-border bg-card">
          <Skills3D skills={sphereSkills} className="h-80 sm:h-[420px]" />
          <p className="hidden border-t border-border px-4 py-2 text-center text-xs text-muted-foreground [@media(pointer:fine)]:block">
            Drag to rotate · hover a label to pause
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <StaggerItem key={group.category}>
              <div className="h-full border border-border bg-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
                  {group.category}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border border-border px-2.5 py-1 text-xs font-medium text-card-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
