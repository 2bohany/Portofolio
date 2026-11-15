import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  level = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Use "h1" when this heading is the page's primary heading (e.g. a route with no other h1). */
  level?: "h1" | "h2";
}) {
  const Heading = level;

  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
      ) : null}
      <Heading className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
