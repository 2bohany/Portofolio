/**
 * General technical approach — each principle is grounded in patterns that
 * actually recur across the projects in data/projects.ts, not generic
 * claims (no testing/CI claims are made because none of the projects
 * describe that work).
 */
export interface ApproachPrinciple {
  title: string;
  description: string;
}

export const approachPrinciples: ApproachPrinciple[] = [
  {
    title: "Reusable, Component-Driven UI",
    description:
      "Interfaces are built from modular, reusable components — from custom React hooks in the Restaurant Dashboard to Angular's component architecture in the Hotel Management System and Rakebny Maak.",
  },
  {
    title: "API-First Integration",
    description:
      "Frontends communicate with backends through REST APIs — NestJS services for the Hotel Management System and payment integration, and a mock API for the User Management Dashboard.",
  },
  {
    title: "Database-Driven Applications",
    description:
      "Data persistence is treated as a first-class concern, using Prisma over SQLite, MongoDB, and SQL Server depending on the project's needs.",
  },
  {
    title: "Responsive by Default",
    description:
      "Every frontend project in this portfolio is built to work across breakpoints — from the RTL mobility interface of Rakebny Maak to e-commerce and dashboard layouts.",
  },
  {
    title: "Design-to-Code Fidelity",
    description:
      "When a Figma design exists, implementation focuses on translating spacing, type, and layout accurately into functional code — as in the Electronics E-Commerce project.",
  },
];
