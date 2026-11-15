export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "SQL", "Python"],
  },
  {
    category: "Frontend",
    skills: [
      "React.js 19",
      "Angular 19",
      "RxJS",
      "Vue.js",
      "React Router",
      "TanStack Query",
      "Zustand",
      "jQuery",
    ],
  },
  {
    category: "UI & Styling",
    skills: [
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "DaisyUI",
      "Bootstrap",
      "Framer Motion",
      "Responsive & RTL Design",
      "Figma",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "REST APIs",
      "JWT / Passport",
      "bcrypt",
      "class-validator",
      "Swagger / OpenAPI",
    ],
  },
  {
    category: "Databases & ORM",
    skills: ["MongoDB", "Mongoose", "SQL Server", "SQLite", "Prisma ORM"],
  },
  {
    category: "Desktop",
    skills: ["Electron", "Electron Builder", "Secure IPC / preload"],
  },
  {
    category: "Testing & Tooling",
    skills: [
      "Jest",
      "Vitest",
      "ESLint",
      "Prettier",
      "Git & GitHub",
      "Vite",
      "Angular CLI",
      "npm workspaces",
      "Vercel",
    ],
  },
  {
    category: "ERP & Integrations",
    skills: ["NetSuite", "SuiteScript", "NetSuite integrations (Node.js / NestJS)"],
  },
  {
    category: "Fundamentals",
    skills: ["OOP", "Data Structures", "Design Patterns", "MVC Architecture", "Agile / Scrum"],
  },
];

/** Short labels for the 3D skills sphere. */
export const sphereSkills = [
  "TypeScript",
  "JavaScript",
  "React",
  "Angular",
  "Vue",
  "Node.js",
  "Express",
  "NestJS",
  "MongoDB",
  "SQL Server",
  "SQLite",
  "Prisma",
  "Tailwind",
  "shadcn/ui",
  "RxJS",
  "Zustand",
  "TanStack",
  "Electron",
  "JWT",
  "Swagger",
  "Jest",
  "Vitest",
  "Vite",
  "Git",
  "Figma",
  "NetSuite",
  "SuiteScript",
  "Python",
  "HTML5",
  "CSS3",
];
