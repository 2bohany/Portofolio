export type ProjectCategory =
  | "Full-Stack"
  | "Frontend"
  | "Backend"
  | "SaaS"
  | "Business Systems"
  | "Desktop"
  | "E-Commerce"
  | "Education"
  | "AI"
  | "UI/UX"
  | "Design"
  | "Mobile";

export type ProjectStatus =
  | "Live"
  | "Completed"
  | "In Development"
  | "Prototype"
  | "Coming Soon";

export interface ProjectFeature {
  label: string;
  implemented: boolean;
}

export interface ArchitectureStep {
  label: string;
  detail?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory[];
  status: ProjectStatus;
  tagline: string;
  description: string;
  problem?: string;
  solution?: string;
  technologies: string[];
  features: ProjectFeature[];
  contribution: string[];
  challenges?: string[];
  technicalApproach?: string;
  architecture?: ArchitectureStep[];
  images: string[];
  demoVideo?: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
}
