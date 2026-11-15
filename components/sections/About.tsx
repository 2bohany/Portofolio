import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

const aboutTechnologies = [
  "TypeScript",
  "JavaScript",
  "React",
  "Angular",
  "Node.js",
  "Express.js",
  "NestJS",
  "MongoDB",
  "SQL Server",
  "Prisma",
  "Electron",
  "Tailwind CSS",
  "NetSuite",
  "Git/GitHub",
  "Figma",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-16 border-b border-border">
      <Container className="py-20 sm:py-24">
        <SectionHeading eyebrow="About" title="Who I Am" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <Reveal tier="standard" className="space-y-5">
            {profile.about.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal tier="subtle" delay={0.1}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden border border-border bg-muted lg:mx-0">
              <Image
                src="/images/youssef.webp"
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(min-width: 1024px) 320px, 80vw"
                className="object-cover object-top"
              />
            </div>
            <p className="mt-8 text-sm font-semibold text-foreground">Positioned Across</p>
            <ul className="mt-4 space-y-2.5">
              {profile.positioning.map((item) => (
                <li key={item} className="text-sm text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal tier="subtle" className="mt-12 flex flex-wrap gap-2">
          {aboutTechnologies.map((tech) => (
            <Badge key={tech} tone="neutral">
              {tech}
            </Badge>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
