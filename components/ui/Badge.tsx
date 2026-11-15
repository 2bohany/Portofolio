import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const toneStyles = {
  neutral: "bg-muted text-muted-foreground",
  accent: "bg-accent/10 text-accent-strong",
  success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  warning: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  pending: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
} as const;

export function Badge({
  children,
  tone = "neutral",
  className,
  icon,
}: {
  children: ReactNode;
  tone?: keyof typeof toneStyles;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        toneStyles[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
