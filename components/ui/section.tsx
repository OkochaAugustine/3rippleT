import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils/helpers";

export function Section({ className, ...props }: ComponentPropsWithoutRef<"section">) {
  return (
    <section
      className={cn("relative flex w-full flex-col py-20 md:py-28", className)}
      {...props}
    />
  );
}
