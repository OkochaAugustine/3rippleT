import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils/helpers";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-6 text-card-foreground shadow-soft",
        className,
      )}
      {...props}
    />
  );
}
