/**
 * Centralized link configuration. Every value here is either a real,
 * user-provided destination or the literal placeholder "#". Nothing in
 * this file is invented — when a real URL is supplied, swap it in here
 * and every component that consumes it updates automatically.
 */

export const PLACEHOLDER = "#";

export const socialLinks = {
  github: "https://github.com/2bohany",
  linkedin: "https://www.linkedin.com/in/yousef-hany-2bohany/",
  email: "mailto:youssef2000649@gmail.com",
  phone: "tel:+201060040247",
};

export const resumeUrl = "/resume/Youssef-Hany-Darwish-CV.pdf";

export function isPlaceholder(url: string | undefined | null): boolean {
  return !url || url === PLACEHOLDER;
}
