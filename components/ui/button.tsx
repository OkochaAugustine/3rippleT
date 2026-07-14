import { cloneElement, isValidElement, type ComponentPropsWithoutRef, type ReactElement } from "react";

import { cn } from "@/lib/utils/helpers";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-glow",
  secondary:
    "bg-secondary text-secondary-foreground shadow-soft hover:-translate-y-0.5",
  outline:
    "border border-border bg-background/60 text-foreground hover:border-foreground/30 hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
  destructive:
    "bg-destructive text-destructive-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-glow",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-7 text-base",
  icon: "size-10 p-0",
};

export function Button({
  asChild,
  children,
  className,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  const buttonClassName = cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
    variants[variant],
    sizes[size],
    className,
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;

    return cloneElement(child, {
      className: cn(buttonClassName, child.props.className),
      ...props,
    });
  }

  return (
    <button
      className={buttonClassName}
      {...props}
    >
      {children}
    </button>
  );
}
