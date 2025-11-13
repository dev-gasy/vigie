import { Link as RouterLink } from "react-router";
import { type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const linkVariants = cva("transition-colors", {
  variants: {
    variant: {
      default:
        "text-primary hover:text-primary/80 underline underline-offset-4",
      muted: "text-muted-foreground hover:text-foreground",
      button:
        "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground font-medium hover:bg-primary/90",
      active: "text-foreground bg-muted",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BaseLinkProps = VariantProps<typeof linkVariants> &
  ComponentProps<typeof RouterLink>;

export interface LinkProps extends BaseLinkProps {
  className?: string;
}

export function Link({ className, variant, ...props }: LinkProps) {
  return (
    <RouterLink
      {...props}
      className={cn(linkVariants({ variant }), className)}
    />
  );
}
