"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });
const SkillsSphere = dynamic(() => import("./SkillsSphere"), { ssr: false });

let webglCache: boolean | undefined;
function hasWebGL() {
  if (webglCache !== undefined) return webglCache;
  try {
    const canvas = document.createElement("canvas");
    webglCache = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    webglCache = false;
  }
  return webglCache;
}
const noopSubscribe = () => () => {};

/**
 * Mounts a three.js scene only on the client, only once it scrolls near the
 * viewport, and only when WebGL is available. Animation stops for users who
 * prefer reduced motion and while the scene is off-screen.
 */
function useLazyScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [visible, setVisible] = useState(false);
  const supported = useSyncExternalStore(noopSubscribe, hasWebGL, () => true);

  useEffect(() => {
    if (!supported) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setShouldMount(true);
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [supported]);

  return { ref, shouldMount: shouldMount && supported, visible, supported };
}

export function Hero3D({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { ref, shouldMount, visible } = useLazyScene();
  return (
    <div ref={ref} className={cn("relative cursor-grab active:cursor-grabbing", className)} aria-hidden>
      {shouldMount ? <HeroScene animate={!reduce && visible} /> : null}
    </div>
  );
}

export function Skills3D({ skills, className }: { skills: string[]; className?: string }) {
  const reduce = useReducedMotion();
  const { ref, shouldMount, visible, supported } = useLazyScene();
  return (
    <div
      ref={ref}
      className={cn("relative cursor-grab active:cursor-grabbing", className)}
      role="img"
      aria-label={`Interactive 3D sphere of technologies: ${skills.join(", ")}`}
    >
      {shouldMount ? <SkillsSphere skills={skills} animate={!reduce && visible} /> : null}
      {!supported ? (
        <p className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-foreground">
          {skills.join(" · ")}
        </p>
      ) : null}
    </div>
  );
}
