export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  location?: string;
  detail?: string;
}

export const educationEntries: EducationEntry[] = [
  {
    institution: "Information Technology Institute (ITI)",
    degree: "Professional Diploma in Web & User Interface Development",
    period: "10/2024 – 07/2025",
    location: "Assiut, Egypt",
  },
  {
    institution: "Egyptian E-Learning University (EELU)",
    degree: "Bachelor of Information Technology",
    period: "06/2020 – 07/2024",
    location: "Assiut, Egypt",
    detail: "Cumulative Grade: Very Good",
  },
];
