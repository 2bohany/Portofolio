/**
 * Practical, project-based experience — derived directly from the projects
 * in data/projects.ts. No employers, clients, or dates are stated here
 * because none were provided; nothing is invented to fill the gap.
 */
export interface ExperienceHighlight {
  area: string;
  description: string;
  technologies: string[];
  relatedProjectSlugs: string[];
}

export const experienceHighlights: ExperienceHighlight[] = [
  {
    area: "Full-Stack Business Systems",
    description:
      "Built a complete hotel management system end-to-end — Angular frontend, NestJS REST API, and a Prisma/SQLite data layer — covering reservations, daily operations, and financial reporting.",
    technologies: ["Angular", "NestJS", "Prisma", "SQLite", "TypeScript"],
    relatedProjectSlugs: ["hotel-management-system"],
  },
  {
    area: "Frontend Development & UI Implementation",
    description:
      "Implemented responsive, component-driven interfaces across React, Angular, and Vue — including converting Figma designs directly into functional UI and building RTL-aware layouts.",
    technologies: ["React.js", "Angular", "Vue.js", "Tailwind CSS", "Figma"],
    relatedProjectSlugs: ["rakebny-maak", "electronics-ecommerce", "restaurant-dashboard"],
  },
  {
    area: "Backend & API Integration",
    description:
      "Built REST APIs and backend logic with Node.js/NestJS, and integrated payment and CRUD flows between frontend clients and backend services.",
    technologies: ["Node.js", "NestJS", "REST APIs"],
    relatedProjectSlugs: ["multi-payment-integration-system", "exam-system"],
  },
  {
    area: "Desktop Application Development",
    description:
      "Developed an offline desktop inventory system in Python with Tkinter, including role-based login and a dynamic GUI for warehouse operations.",
    technologies: ["Python", "Tkinter", "OOP"],
    relatedProjectSlugs: ["warehouse-inventory-system"],
  },
];
