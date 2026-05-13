import * as React from "react";
import { cn, cva } from "../../lib/utils";
import styles from "./Badge.module.css";

const badgeVariants = cva(styles.base, {
  variants: {
    variant: {
      default: styles.variantDefault,
      secondary: styles.variantSecondary,
      destructive: styles.variantDestructive,
      outline: styles.variantOutline,
      success: styles.variantSuccess,
      warning: styles.variantWarning,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
