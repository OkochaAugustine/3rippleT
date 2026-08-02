import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils/helpers";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-black/50 text-card-foreground backdrop-blur-md shadow-soft",
        className,
      )}
      {...props}
    />
  );
}
