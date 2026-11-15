import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "All projects by Youssef Hany Darwish — full-stack, frontend, backend, desktop, and design work.",
};

export default function ProjectsPage() {
  return (
    <Container as="section" className="py-16 sm:py-24">
      <SectionHeading
        eyebrow="Work"
        title="All Projects"
        description="Full-stack systems, frontend applications, desktop tools, and design work — filter by category or status to explore."
        level="h1"
      />
      <div className="mt-12">
        <ProjectsExplorer projects={projects} />
      </div>
    </Container>
  );
}
