import type { Transition, Variants } from "framer-motion";

/**
 * Motion tokens translated from the ui-ux-pro-max skill's `gsap` domain
 * guidance (Scroll Reveal: Subtle and Standard tiers) into Framer Motion
 * equivalents — same duration/easing/offset budget, no GSAP dependency
 * needed since this is a React/Next.js stack.
 *
 * Subtle  (cards, list items): 300-400ms, power1.out, y offset 8-16px
 * Standard (section entrances): 400-600ms, power2.out, y offset ~24px
 */

export const easeSubtle: Transition["ease"] = [0.33, 1, 0.68, 1];
export const easeStandard: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeUpSubtle: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeSubtle },
  },
};

export const fadeUpStandard: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeStandard },
  },
};

/** Stagger container — cap at 8 children per the skill's "don't stagger more than ~8" rule. */
export function staggerContainer(staggerAmount = 0.08): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerAmount,
        delayChildren: 0.04,
      },
    },
  };
}

export const MAX_STAGGER_CHILDREN = 8;
