import { cn } from "../../lib/utils";
import styles from "./Skeleton.module.css";

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn(styles.skeleton, className)} {...props} />;
}

export { Skeleton };
