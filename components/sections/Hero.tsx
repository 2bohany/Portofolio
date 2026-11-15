import { ArrowRight, Download, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { resumeUrl } from "@/data/links";

export function Hero() {
  return (
    <section id="hero" className="border-b border-border">
      <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_auto] lg:items-end">
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

        <Reveal tier="subtle" delay={0.15} className="hidden lg:block">
          <div
            aria-hidden
            className="flex h-40 w-40 items-center justify-center border border-border bg-card text-5xl font-bold text-foreground"
          >
            YD
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
