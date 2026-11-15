import { Mail, Phone } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { socialLinks, isPlaceholder } from "@/data/links";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const contactMethods = [
  { label: "Email", value: profile.email, href: socialLinks.email, icon: Mail },
  { label: "Phone", value: profile.phone, href: socialLinks.phone, icon: Phone },
  { label: "LinkedIn", value: "in/yousef-hany-2bohany", href: socialLinks.linkedin, icon: LinkedinIcon },
  { label: "GitHub", value: "github.com/2bohany", href: socialLinks.github, icon: GithubIcon },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-16">
      <Container className="py-20 sm:py-28">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Work Together"
          description="Open to discussing new opportunities, collaborations, or freelance work."
          align="center"
        />

        <Reveal tier="standard" className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          {contactMethods.map((method) => {
            const disabled = isPlaceholder(method.href);
            const Icon = method.icon;

            const content = (
              <>
                <Icon className="h-5 w-5 text-accent" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-card-foreground">{method.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {disabled ? "Coming soon" : method.value}
                  </p>
                </div>
              </>
            );

            const classes = cn(
              "flex items-center gap-4 border border-border bg-card p-5 transition-colors duration-200",
              disabled
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            );

            if (disabled) {
              return (
                <span key={method.label} className={classes} aria-disabled>
                  {content}
                </span>
              );
            }

            return (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={classes}
              >
                {content}
              </a>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
