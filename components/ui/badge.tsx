import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils/helpers";

type BadgeVariant = "default" | "accent" | "outline";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  default: "bg-muted text-foreground",
  accent: "bg-accent text-accent-foreground",
  outline: "border border-border text-muted-foreground",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded-md px-3 text-xs font-bold uppercase tracking-[0.16em]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
