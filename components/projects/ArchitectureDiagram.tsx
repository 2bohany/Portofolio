import { ArrowDown } from "lucide-react";
import type { ArchitectureStep } from "@/types/project";

export function ArchitectureDiagram({ steps }: { steps: ArchitectureStep[] | undefined }) {
  if (!steps || steps.length === 0) {
    return <p className="text-sm text-muted-foreground">Architecture details coming soon.</p>;
  }

  return (
    <ol className="flex max-w-md flex-col items-stretch">
      {steps.map((step, index) => (
        <li key={step.label} className="flex flex-col items-center">
          <div className="w-full border border-border bg-card px-4 py-3 text-center">
            <p className="text-sm font-semibold text-card-foreground">{step.label}</p>
            {step.detail ? (
              <p className="mt-0.5 text-xs text-muted-foreground">{step.detail}</p>
            ) : null}
          </div>
          {index < steps.length - 1 ? (
            <ArrowDown className="my-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
