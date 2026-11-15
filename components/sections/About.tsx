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
            <figure className="group relative mx-auto w-full max-w-xs lg:mx-0">
              {/* Blue glow behind the frame */}
              <div
                aria-hidden
                className="absolute -inset-4 bg-accent/25 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative aspect-[4/5] overflow-hidden border border-accent/40 bg-[#0b1220] shadow-[0_24px_60px_-24px_rgba(37,99,235,0.7)]">
                <Image
                  src="/images/youssef-portrait.webp"
                  alt={`Portrait of ${profile.name}`}
                  fill
                  sizes="(min-width: 1024px) 320px, 80vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#060a14] via-[#060a14]/70 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-base font-semibold text-white">{profile.name}</p>
                  <p className="mt-1 flex items-center gap-2 text-xs font-medium text-blue-200">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_2px_rgba(96,165,250,0.8)]" />
                    {profile.title} · {profile.location}
                  </p>
                </figcaption>
              </div>
              {/* Accent corner brackets */}
              <span aria-hidden className="absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-accent" />
              <span aria-hidden className="absolute -right-2 -top-2 h-6 w-6 border-r-2 border-t-2 border-accent" />
              <span aria-hidden className="absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-accent" />
              <span aria-hidden className="absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-accent" />
            </figure>
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
