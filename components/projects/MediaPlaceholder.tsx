import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

/** Honest "no media yet" state — never a stock photo standing in for a real screenshot. */
export function MediaPlaceholder({
  label = "Screenshots coming soon",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 border border-dashed border-border bg-muted/40 text-muted-foreground",
        className
      )}
    >
      <ImageOff className="h-6 w-6" aria-hidden />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
