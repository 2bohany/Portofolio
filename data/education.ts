/**
 * No education details (institution, degree, dates) were provided.
 * Intentionally left empty rather than invented — the Education section
 * renders an honest "coming soon" state until this is filled in.
 */
export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  detail?: string;
}

export const educationEntries: EducationEntry[] = [];
