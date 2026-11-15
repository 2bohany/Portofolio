import { Check, Clock3 } from "lucide-react";
import type { ProjectFeature } from "@/types/project";

export function ProjectFeatures({ features }: { features: ProjectFeature[] }) {
  if (features.length === 0) {
    return <p className="text-sm text-muted-foreground">Feature details coming soon.</p>;
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {features.map((feature) => (
        <li key={feature.label} className="flex items-start gap-2.5 text-sm">
          {feature.implemented ? (
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
          ) : (
            <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden />
          )}
          <span className="text-foreground">
            {feature.label}
            {!feature.implemented ? (
              <span className="ml-2 text-xs font-medium text-muted-foreground">(Planned)</span>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}
