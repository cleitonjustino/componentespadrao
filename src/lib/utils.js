import { clsx } from "clsx";

/**
 * Combina classes condicionalmente
 * @param  {...(string|object|boolean)} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return clsx(inputs);
}

/**
 * Cria variantes de componentes com tipagem
 * @param {string} base - Classes base
 * @param {object} options - Opções de variantes
 * @returns {Function}
 */
export function cva(base, options) {
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
