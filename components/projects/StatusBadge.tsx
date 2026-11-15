import { CheckCircle2, Clock, FlaskConical, Hourglass } from "lucide-react";
import type { ProjectStatus } from "@/types/project";
import { Badge } from "@/components/ui/Badge";

const statusConfig: Record<
  ProjectStatus,
  { tone: "success" | "accent" | "pending" | "warning" | "neutral"; icon: React.ReactNode }
> = {
  Live: {
    tone: "success",
    icon: (
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse"
      />
    ),
  },
  Completed: { tone: "accent", icon: <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> },
  "In Development": { tone: "pending", icon: <Clock className="h-3.5 w-3.5" aria-hidden /> },
  Prototype: { tone: "warning", icon: <FlaskConical className="h-3.5 w-3.5" aria-hidden /> },
  "Coming Soon": { tone: "neutral", icon: <Hourglass className="h-3.5 w-3.5" aria-hidden /> },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = statusConfig[status];
  return (
    <Badge tone={config.tone} icon={config.icon}>
      {status}
    </Badge>
  );
}
