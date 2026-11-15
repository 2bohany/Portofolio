export interface ExperienceRole {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  bullets: string[];
  technologies: string[];
}

export const experienceRoles: ExperienceRole[] = [
  {
    role: "Full-Stack Developer",
    company: "Bellatrix",
    period: "09/2025 – 09/2026",
    location: "Remote",
    bullets: [
      "Developed web applications.",
      "Collaborated with the development team to build a Payroll System and an HR System.",
      "Developed NetSuite ERP customizations with SuiteScript.",
      "Built integrations between NetSuite and external systems using Node.js and NestJS.",
    ],
    technologies: [
      "React",
      "Angular",
      "NetSuite",
      "SuiteScript",
      "JavaScript",
      "Node.js",
      "NestJS",
      "Tailwind CSS",
      "Responsive & RTL Design",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    period: "03/2025 – 08/2025",
    location: "Remote",
    bullets: [
      "Designed, built and deployed 3+ client web applications using React.js, Angular, Node.js and Tailwind CSS, from requirements to production deployment on Vercel.",
      "Built REST APIs with Node.js/Express and NestJS backed by MongoDB, including JWT authentication and role-based access control.",
      "Translated Figma designs into reusable, responsive and RTL-ready UI components in collaboration with designers.",
      "Managed source control, code reviews and releases with Git/GitHub, and kept code quality consistent with ESLint, Prettier and automated tests.",
    ],
    technologies: ["React.js", "Angular", "Node.js", "Express", "NestJS", "MongoDB", "JWT", "Tailwind CSS", "Vercel"],
  },
];
