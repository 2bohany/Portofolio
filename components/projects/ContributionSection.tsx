import { UserCheck } from "lucide-react";

export function ContributionSection({ contribution }: { contribution: string[] }) {
  if (contribution.length === 0) {
    return <p className="text-sm text-muted-foreground">Contribution details coming soon.</p>;
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {contribution.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
          <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}
