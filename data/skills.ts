export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      "JavaScript",
      "TypeScript",
      "React.js",
      "Angular",
      "Vue.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Vite",
      "jQuery",
    ],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "NestJS", "REST APIs"],
  },
  {
    category: "Databases",
    skills: ["SQL Server", "SQLite", "MongoDB", "PostgreSQL", "Prisma"],
  },
  {
    category: "Programming / CS",
    skills: ["OOP", "Data Structures", "Design Patterns"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "Figma", "Photoshop", "Illustrator"],
  },
  {
    category: "Desktop",
    skills: ["Python", "Tkinter"],
  },
];
