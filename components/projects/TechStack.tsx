import { Badge } from "@/components/ui/Badge";

export function TechStack({ technologies }: { technologies: string[] }) {
  if (technologies.length === 0) {
    return <p className="text-sm text-muted-foreground">Technology details coming soon.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <Badge key={tech} tone="accent">
          {tech}
        </Badge>
      ))}
    </div>
  );
}
