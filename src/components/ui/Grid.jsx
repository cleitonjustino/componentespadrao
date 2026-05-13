import * as React from "react";
import { cn, cva } from "../../lib/utils";
import styles from "./Grid.module.css";

// Breakpoints baseado em Radix UI Themes
const BREAKPOINTS = {
  initial: "0px",
  xs: "520px",
  sm: "768px",
  md: "1024px",
  lg: "1280px",
  xl: "1640px",
};

const BREAKPOINT_ORDER = ["initial", "xs", "sm", "md", "lg", "xl"];

// Converte valores responsivos em classes CSS
const getResponsiveClasses = (value, prefix) => {
  if (typeof value === "number") {
    return styles[`${prefix}${value}`];
  }

  if (typeof value === "object") {
    const classes = [];
    for (const bp of BREAKPOINT_ORDER) {
      if (value[bp] !== undefined) {
        const className = styles[`${prefix}${value[bp]}${bp === "initial" ? "" : `@${bp}`}`];
        if (className) {
          classes.push(className);
        }
      }
    }
    return cn(...classes);
  }

  return "";
};

const gridVariants = cva(styles.base, {
  variants: {
    align: {
      start: styles.alignStart,
      center: styles.alignCenter,
      end: styles.alignEnd,
      stretch: styles.alignStretch,
    },
    justify: {
      start: styles.justifyStart,
      center: styles.justifyCenter,
      end: styles.justifyEnd,
      between: styles.justifyBetween,
    },
  },
  defaultVariants: {
    align: "stretch",
    justify: "start",
  },
});

const Grid = React.forwardRef(
  (
    {
      className,
      cols = 1,
      gap = 4,
      align = "stretch",
      justify = "start",
      children,
      ...props
    },
    ref
  ) => {
    const colsClasses = getResponsiveClasses(cols, "cols");
    const gapClasses = getResponsiveClasses(gap, "gap");

    return (
      <div
        ref={ref}
        className={cn(
          gridVariants({ align, justify }),
          colsClasses,
          gapClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

const GridItem = React.forwardRef(
  ({
    className,
    colSpan,
    rowSpan,
    colSpanResponsive,
    children,
    ...props
  },
  ref) => {
    const colSpanClasses = colSpanResponsive
      ? getResponsiveClasses(colSpanResponsive, "colSpan")
      : colSpan && styles[`colSpan${colSpan}`];

    return (
      <div
        ref={ref}
        className={cn(
          styles.item,
          colSpanClasses,
          rowSpan && styles[`rowSpan${rowSpan}`],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = "GridItem";

export { Grid, GridItem, gridVariants, BREAKPOINTS };
