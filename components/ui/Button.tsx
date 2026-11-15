import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-5 text-sm font-semibold " +
  "transition-colors duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-background";

const variantStyles = {
  primary: "bg-primary text-on-primary hover:bg-secondary",
  accent: "bg-accent text-on-accent hover:brightness-110",
  outline: "border border-border bg-transparent text-foreground hover:bg-muted",
  ghost: "bg-transparent text-foreground hover:bg-muted",
} as const;

type Variant = keyof typeof variantStyles;

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", className, children, ...rest } = props;
  const classes = cn(baseStyles, variantStyles[variant], className);

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorRest}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
