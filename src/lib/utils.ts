import { clsx, type ClassValue } from "clsx";

/**
 * Combina classes condicionalmente
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Propriedades para variantes de componentes
 */
export interface CVAOptions {
  variants?: Record<string, Record<string, string>>;
  compoundVariants?: Array<Record<string, any> & { class: string }>;
  defaultVariants?: Record<string, string | number>;
}

export interface VariantProps<T extends CVAOptions> {
  [key: string]: any;
}

/**
 * Cria variantes de componentes com tipagem
 */
export function cva(
  base: string,
  options?: CVAOptions
): (props?: Record<string, any>) => string {
  return function (props = {}) {
    const { variant, size, className, ...rest } = props;
    const variants = options?.variants || {};
    const compoundVariants = options?.compoundVariants || [];
    const defaultVariants = options?.defaultVariants || {};

    let result = base;

    // Aplica variantes padrão
    if (defaultVariants.variant && variants.variant) {
      result += " " + (variants.variant[defaultVariants.variant] || "");
    }
    if (defaultVariants.size && variants.size) {
      result += " " + (variants.size[defaultVariants.size] || "");
    }

    // Aplica variantes passadas
    if (variant && variants.variant) {
      result += " " + (variants.variant[variant] || "");
    }
    if (size && variants.size) {
      result += " " + (variants.size[size] || "");
    }

    // Aplica compound variants
    compoundVariants.forEach((cv) => {
      const matches = Object.entries(cv).every(([key, value]) => {
        if (key === "class") return true;
        return props[key] === value || defaultVariants[key] === value;
      });
      if (matches) {
        result += " " + cv.class;
      }
    });

    // Adiciona classes extras
    if (className) {
      result += " " + className;
    }

    return result.trim();
  };
}

export type { ClassValue };
