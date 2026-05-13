import * as React from "react";
import { cn } from "../../lib/utils";
import styles from "./Avatar.module.css";

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(styles.avatar, className)} {...props} />
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <img ref={ref} className={cn(styles.image, className)} {...props} />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(styles.fallback, className)} {...props} />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
