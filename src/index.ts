import type { ClassObject, ClassValue } from "./types.ts";

/**
 * Combines class names efficiently, filtering out falsy values.
 * Accepts strings, falsy values, and objects (`{ [className]: boolean }`).
 *
 * @example
 * ```ts
 * // Strings
 * classigo("btn", "btn--primary", isLarge && "btn--lg")
 * // → "btn btn--primary btn--lg"
 *
 * // Objects
 * classigo("btn", { "btn--active": isActive, "btn--disabled": !isEnabled })
 * // → "btn btn--active"
 *
 * // Mixed
 * classigo("btn", isLarge && "btn--lg", { "btn--active": isActive })
 * // → "btn btn--lg btn--active"
 * ```
 */
export function classigo(...classes: ClassValue[]): string {
  let result = "";
  for (let i = 0; i < classes.length; i++) {
    const cls = classes[i];
    if (!cls) continue;
    if (typeof cls === "string") {
      result = result ? result + " " + cls : cls;
      continue;
    }
    const obj = cls as ClassObject;
    for (const key in obj) {
      if (obj[key]) result = result ? result + " " + key : key;
    }
  }
  return result;
}

export default classigo;
export type { ClassValue, ClassObject } from "./types.ts";
