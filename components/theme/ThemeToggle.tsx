"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/lib/useHasMounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-none border border-border text-foreground transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : (
        <Moon className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
