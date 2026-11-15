import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function DetailSection({
  title,
  children,
  className,
  muted = false,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section className={cn(muted && "bg-muted/40", className)}>
      <Container className="py-10 sm:py-12">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{title}</h2>
        <div className="mt-6">{children}</div>
      </Container>
    </section>
  );
}
