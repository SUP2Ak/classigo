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
    if (typeof cls !== "string") {
      for (const key in cls as ClassObject) {
        if ((cls as ClassObject)[key])
          result = result ? result + " " + key : key;
      }
      continue;
    }
    result = result ? result + " " + cls : cls;
  }
  return result;
}

export default classigo;
export type { ClassValue, ClassObject } from "./types.ts";
