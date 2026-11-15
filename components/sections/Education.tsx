import { GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { educationEntries } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="scroll-mt-16 border-b border-border">
      <Container className="py-20 sm:py-24">
        <SectionHeading eyebrow="Education" title="Education" />

        <div className="mt-10">
          {educationEntries.length === 0 ? (
            <div className="flex flex-col items-start gap-3 border border-dashed border-border p-8 text-muted-foreground">
              <GraduationCap className="h-6 w-6" aria-hidden />
              <p className="text-sm">Education details coming soon.</p>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-border border-t border-border">
              {educationEntries.map((entry) => (
                <li key={entry.institution} className="py-6">
                  <p className="text-base font-semibold text-foreground">{entry.degree}</p>
                  <p className="text-sm text-muted-foreground">
                    {entry.institution} · {entry.period}
                  </p>
                  {entry.detail ? (
                    <p className="mt-2 text-sm text-muted-foreground">{entry.detail}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
