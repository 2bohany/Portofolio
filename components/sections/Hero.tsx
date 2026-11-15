import { ArrowRight, Download, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { resumeUrl } from "@/data/links";
import { Hero3D } from "@/components/three/Scene3D";

export function Hero() {
  return (
    <section id="hero" className="border-b border-border">
      <Container className="grid grid-cols-[minmax(0,1fr)] gap-12 py-20 sm:py-28 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:py-16">
        <Reveal tier="standard">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            {profile.location}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-xl font-medium text-muted-foreground sm:text-2xl">
            {profile.title}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.heroDescription}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="#projects" variant="primary">
              View Projects
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="#contact" variant="outline">
              <Mail className="h-4 w-4" aria-hidden />
              Contact Me
            </Button>
            <Button href={resumeUrl} variant="ghost" download>
              <Download className="h-4 w-4" aria-hidden />
              Download CV
            </Button>
          </div>
        </Reveal>

        <Hero3D className="h-72 min-w-0 overflow-hidden sm:h-96 lg:mx-0 lg:h-[480px] lg:w-[480px]" />
      </Container>
    </section>
  );
}
