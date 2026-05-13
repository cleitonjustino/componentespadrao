import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn, cva } from "../../lib/utils";
import styles from "./Label.module.css";

const labelVariants = cva(styles.base, {
  variants: {
    size: {
      default: styles.sizeDefault,
      sm: styles.sizeSm,
      lg: styles.sizeLg,
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const Label = React.forwardRef(({ className, size, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ size }), className)}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
