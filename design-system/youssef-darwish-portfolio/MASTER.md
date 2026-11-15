# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Youssef Darwish Portfolio
**Generated:** 2026-08-18 20:20:33
**Category:** Portfolio/Personal
**Design Dials:** Variance 3/10 (Centered / Minimal) | Motion 5/10 (Standard) | Density 5/10 (Standard)

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#18181B` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#3F3F46` | `--color-secondary` |
| On Secondary | `#FFFFFF` | `--color-on-secondary` |
| Accent/CTA | `#2563EB` | `--color-accent` |
| On Accent/CTA | `#FFFFFF` | `--color-on-accent` |
| Background | `#FAFAFA` | `--color-background` |
| Foreground | `#09090B` | `--color-foreground` |
| Card | `#FFFFFF` | `--color-card` |
| Card Foreground | `#09090B` | `--color-card-foreground` |
| Muted | `#E8ECF0` | `--color-muted` |
| Muted Foreground | `#475569` | `--color-muted-foreground` |
| Border | `#E4E4E7` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| On Destructive | `#FFFFFF` | `--color-on-destructive` |
| Ring | `#18181B` | `--color-ring` |

**Color Notes:** Monochrome + blue accent

### Typography

- **Heading Font:** Archivo
- **Body Font:** Space Grotesk
- **Mood:** minimal, portfolio, designer, creative, clean, artistic
- **Google Fonts:** [Archivo + Space Grotesk](https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

### Spacing Variables

*Density: 5/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #2563EB;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #18181B;
  border: 2px solid #18181B;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #FAFAFA;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #18181B;
  outline: none;
  box-shadow: 0 0 0 3px #18181B20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Minimalism & Swiss Style

**Keywords:** Clean, simple, spacious, functional, white space, high contrast, geometric, sans-serif, grid-based, essential

**Best For:** Enterprise apps, dashboards, documentation sites, SaaS platforms, professional tools

**Key Effects:** Subtle hover (200-250ms), smooth transitions, sharp shadows if any, clear type hierarchy, fast loading

### Page Pattern

**Pattern Name:** Scroll-Triggered Storytelling

- **Conversion Strategy:** Keep the narrative understandable without scroll-driven effects. Use progress indicator. Mobile: simplify animations. Keep DOM reading order complete; disable parallax and scroll-scrub under reduced motion. Pause scroll animation when offscreen or hidden and render each chapter in its final readable state under reduced motion.
- **CTA Placement:** End of each chapter (mini) + Final climax CTA
- **Section Order:** Intro hook > Chapter 1 (problem) > Chapter 2 (journey) > Chapter 3 (solution) > Climax CTA

---

## Motion

**Stagger List** (Standard) — Trigger: load or scroll | Duration: 300-450ms | Easing: `back.out(1.4)`

```js
gsap.from('.grid-item', { opacity: 0, scale: 0.92, y: 16, duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)' });
```

**Framework notes:** grid: 'auto' lets GSAP infer rows/columns from a CSS grid layout for a natural wave stagger; Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately

- ✅ Combine with from: 'center' for a bento-grid layout to draw the eye inward first
- ❌ Don't use back.out on dense data tables; the overshoot reads as sloppy on informational UI
- ⚡ Group DOM writes; avoid interleaving layout reads (getBoundingClientRect) between staggered tweens

---

## Anti-Patterns (Do NOT Use)

- ❌ Corporate templates
- ❌ Generic layouts

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile

---

## Implementation Resolution & Overrides

This section records where the actual implementation deviates from the raw
generator output above, and why — required reading before touching the
design system, since the generator output alone is not what was built.

**Color palette, style (Minimalism & Swiss Style), border-radius (0px /
sharp corners), and the Standard-tier stagger motion were taken as-is.**

### Typography — overridden to Inter

The generator's `--design-system` query ties typography to the raw
"Portfolio/Personal" product-type default (Archivo + Space Grotesk, tagged
"Best For: Design portfolios, creative professionals"). But the resolved
**style** for this project is Minimalism & Swiss Style, and a direct
`--domain typography` query for that style returns a different, explicitly
matching pairing:

> **Minimal Swiss** — Inter / Inter — "Best For: Dashboards, admin panels,
> documentation, enterprise apps, design systems"

Since this is a recruiter-facing technical portfolio (enterprise/professional
positioning), not an artistic design portfolio, **Inter was used instead of
Archivo/Space Grotesk** — it's the pairing tied to the style that was
actually resolved, not the one tied to the generic product category.

### Page pattern — overridden to Portfolio Grid

The generator defaults "Portfolio/Personal" to a **Scroll-Triggered
Storytelling** pattern (chapter-based narrative scroll, climax CTA). A direct
`--domain landing` query for "portfolio case study project showcase" returns
a distinct, better-matched pattern:

> **Portfolio Grid** — Hero (Name/Role) > Project Grid (filterable) >
> About/Philosophy > Contact — "Filter by category. Fast loading essential."

This project needs to present 14 real projects with category/status
filtering and dedicated case-study pages — a content-dense, scannable
structure a recruiter can navigate quickly. A single-narrative chapter
scroll works against that goal (accessibility/layout priorities 1 and 5 in
the skill's own priority table outrank a purely narrative pattern here).
**Portfolio Grid was used**: Hero → About → Skills → Featured Projects (grid,
links to full case studies) → Experience → Education → Contributions →
Technical Approach → Contact, with a dedicated `/projects` route carrying
the full filterable grid and `/projects/[slug]` carrying each case study.

### Icons — no database match, used stated default

Both `--domain icons` queries ("professional interface icon set outline",
"icon library svg lucide") returned 0 results. Per the skill's own
fallback instructions, this is stated explicitly rather than silently
substituted: **Lucide React** was used, matching the icon default named in
every pre-delivery checklist this generator produced ("use SVG:
Heroicons/Lucide"). Two brand marks (GitHub, LinkedIn) aren't in the
installed lucide-react version's export set (brand/logo icons were dropped
from its core); those two are hand-built inline SVGs following lucide's
exact visual convention (24×24, `currentColor`, same stroke style) rather
than left broken or replaced with emoji.

### Component Specs (Buttons/Cards/Inputs/Modals) — not followed as-is

The generic `border-radius: 8px/12px/16px` + drop-shadow CSS in the
"Component Specs" section above is boilerplate that doesn't reflect the
resolved style — it directly contradicts Minimalism & Swiss Style's own
`--border-radius: 0px` / "sharp shadows if any" variables (confirmed via a
direct `--domain style` query). Buttons, cards, badges, and inputs were
implemented with `rounded-none` (sharp corners) and border-only surfaces
(no drop shadows, no hover-lift transforms), consistent with the resolved
style rather than this generic snippet. Pill shapes (status/category
badges) are a deliberate exception — rounded tags are a standard
Swiss/geometric typographic device, not a "soft card" violation.

### Accent-on-tint contrast — added `--accent-strong` token

`text-accent` (`#2563EB`) on a `bg-accent/10` tinted badge background
measures ~4.50:1 in light mode and ~4.30:1 in dark mode — at or below the
4.5:1 AA minimum this generator's own checklist requires. Confirmed via
axe-core automated scan (0 violations after the fix, 1 serious violation
before it). Added a dedicated on-tint text step per theme — `#1D4ED8` in
light mode, `#60A5FA` in dark mode — used only for text over tinted accent
badges, keeping the base `--accent` token for solid CTA use where the
`4.5:1`+ contrast already holds against `--on-accent`.
