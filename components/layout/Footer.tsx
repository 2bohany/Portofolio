import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { Container } from "@/components/ui/Container";
import { SocialLink } from "@/components/ui/SocialLink";
import { socialLinks } from "@/data/links";
import { profile } from "@/data/profile";

const footerNav = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <p className="text-sm font-bold tracking-tight text-foreground">{profile.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {profile.title} based in {profile.location}. Building modern, responsive, and
            scalable applications across the frontend, backend, and database layers.
          </p>
          <div className="mt-6 flex gap-3">
            <SocialLink href={socialLinks.github} label="GitHub" icon={<GithubIcon className="h-4 w-4" />} />
            <SocialLink href={socialLinks.linkedin} label="LinkedIn" icon={<LinkedinIcon className="h-4 w-4" />} />
            <SocialLink href={socialLinks.email} label="Email" icon={<Mail className="h-4 w-4" aria-hidden />} />
            <SocialLink href={socialLinks.phone} label="Phone" icon={<Phone className="h-4 w-4" aria-hidden />} />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Navigate</p>
          <ul className="mt-4 space-y-3">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <a href={socialLinks.email} className="transition-colors duration-200 hover:text-foreground">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={socialLinks.phone} className="transition-colors duration-200 hover:text-foreground">
                {profile.phone}
              </a>
            </li>
            <li>{profile.location}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border py-6">
        <Container className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Built with Next.js, TypeScript & Tailwind CSS.</p>
        </Container>
      </div>
    </footer>
  );
}
