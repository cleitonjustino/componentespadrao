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
} as const;

const BREAKPOINT_ORDER = ["initial", "xs", "sm", "md", "lg", "xl"] as const;

type BreakpointKey = keyof typeof BREAKPOINTS;
type ResponsiveValue<T> = T | Record<BreakpointKey, T>;

// Converte valores responsivos em classes CSS
const getResponsiveClasses = (value: ResponsiveValue<number>, prefix: string): string => {
  if (typeof value === "number") {
    return styles[`${prefix}${value}`] ?? "";
  }

  if (typeof value === "object") {
    const classes: string[] = [];
    for (const bp of BREAKPOINT_ORDER) {
      if (value[bp] !== undefined) {
        const className =
          styles[`${prefix}${value[bp]}${bp === "initial" ? "" : `@${bp}`}`];
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

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: ResponsiveValue<number>;
  gap?: ResponsiveValue<number>;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
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

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: number;
  rowSpan?: number;
  colSpanResponsive?: ResponsiveValue<number>;
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      className,
      colSpan,
      rowSpan,
      colSpanResponsive,
      children,
      ...props
    },
    ref
  ) => {
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
