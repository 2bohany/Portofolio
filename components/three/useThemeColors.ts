"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export interface ThemeColors {
  accent: string;
  foreground: string;
  muted: string;
  font: string;
}

const fallback: ThemeColors = {
  accent: "#2563eb",
  foreground: "#09090b",
  muted: "#475569",
  font: "sans-serif",
};

/** Reads the site's CSS color tokens so 3D scenes match the active theme. */
export function useThemeColors(): ThemeColors {
  const { resolvedTheme } = useTheme();
  const [colors, setColors] = useState<ThemeColors>(fallback);

  useEffect(() => {
    // Wait a frame so the theme attribute has been applied to <html>.
    const id = requestAnimationFrame(() => {
      const root = getComputedStyle(document.documentElement);
      const read = (name: string, fb: string) => root.getPropertyValue(name).trim() || fb;
      setColors({
        accent: read("--accent", fallback.accent),
        foreground: read("--foreground", fallback.foreground),
        muted: read("--muted-foreground", fallback.muted),
        font: getComputedStyle(document.body).fontFamily || fallback.font,
      });
    });
    return () => cancelAnimationFrame(id);
  }, [resolvedTheme]);

  return colors;
}
