import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils/helpers";

export const Section = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<"section">
>(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={cn("relative flex w-full flex-col py-20 md:py-28", className)}
      {...props}
    />
  );
});
Section.displayName = "Section";
