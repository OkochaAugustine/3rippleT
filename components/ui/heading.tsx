import type { ElementType, HTMLAttributes } from "react";

import { cn } from "@/lib/utils/helpers";

type HeadingSize = "sm" | "md" | "lg" | "xl";

type HeadingProps<T extends ElementType> = {
  as?: T;
  size?: HeadingSize;
} & HTMLAttributes<HTMLElement>;

const sizes: Record<HeadingSize, string> = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-5xl",
  lg: "text-4xl md:text-6xl",
  xl: "text-5xl md:text-7xl",
};

export function Heading<T extends ElementType = "h2">({
  as,
  className,
  size = "md",
  ...props
}: HeadingProps<T>) {
  const Comp = as ?? "h2";

  return (
    <Comp
      className={cn(
        "text-balance font-display font-black leading-[0.95] tracking-normal",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
