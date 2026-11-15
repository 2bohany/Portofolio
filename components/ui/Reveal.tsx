"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUpStandard, fadeUpSubtle, staggerContainer } from "@/lib/motion";
import { useHasMounted } from "@/lib/useHasMounted";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** subtle = card/list-item entrance, standard = section entrance */
  tier?: "subtle" | "standard";
  delay?: number;
}

/**
 * Reveals a single block on scroll into view. Renders fully visible
 * (no opacity-0 baked into SSR output) until the component has mounted
 * on the client — content must never be invisible-by-default for
 * crawlers, no-JS users, or the pre-hydration paint. See the ui-ux-pro-max
 * skill's scroll-reveal guidance: "don't reveal below-the-fold content
 * needed for SEO/crawlers as invisible-by-default without a no-JS fallback."
 */
export function Reveal({ children, className, tier = "standard", delay = 0 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useHasMounted();
  const variants = tier === "subtle" ? fadeUpSubtle : fadeUpStandard;

  if (!mounted || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container — wrap StaggerItem children. */
export function StaggerGroup({
  children,
  className,
  staggerAmount,
}: {
  children: ReactNode;
  className?: string;
  staggerAmount?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useHasMounted();

  if (!mounted || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer(staggerAmount)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useHasMounted();

  if (!mounted || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={fadeUpSubtle} className={className}>
      {children}
    </motion.div>
  );
}
