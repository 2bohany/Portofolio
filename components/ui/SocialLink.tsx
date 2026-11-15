import type { ReactNode } from "react";
import { isPlaceholder } from "@/data/links";
import { cn } from "@/lib/utils";

/**
 * Renders a real, clickable link when a destination is provided, or an
 * inert, clearly-disabled control when it's still the "#" placeholder —
 * never a dead href="#" that silently does nothing on click.
 */
export function SocialLink({
  href,
  label,
  icon,
  className,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  className?: string;
}) {
  const disabled = isPlaceholder(href);
  const base =
    "inline-flex h-11 w-11 items-center justify-center border border-border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  if (disabled) {
    return (
      <span
        role="img"
        aria-label={`${label} — link coming soon`}
        title={`${label} — coming soon`}
        className={cn(base, "cursor-not-allowed text-muted-foreground/50", className)}
      >
        {icon}
      </span>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className={cn(base, "cursor-pointer text-foreground hover:bg-muted", className)}
    >
      {icon}
    </a>
  );
}
