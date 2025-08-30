

/**
 * Appends a class to an existing class string
 * @param value - The existing class string
 * @param newClass - The new class to append
 * @returns The combined class string
 */
function appendClass(value: string, newClass: string): string {
  return !newClass ? value : value ? (value + ' ' + newClass) : newClass;
}

/**
 * Ultra-optimized class name utility for CSS Modules
 *
 * Combines class names efficiently, filtering out falsy values.
 * Perfect for conditional classes and CSS Modules integration.
 *
 * @param classes - Variable number of class names or falsy values
 * @returns Combined class names separated by spaces
 *
 * @example
 * ```typescript
 * // Basic usage
 * classigo('button', 'button--primary', 'button--large')
 * // → "button button--primary button--large"
 *
 * // With conditions (prefer && over ternary)
 * classigo('button', 'button--primary', isLarge && 'button--large')
 * // → "button button--primary" (if isLarge is false)
 * // → "button button--primary button--large" (if isLarge is true)
 *
 * // With template literals
 * classigo('button', `button--${variant}`, isLarge && 'button--large')
 * // → "button button--primary button--large" (if variant = 'primary')
 *
 * // With CSS Modules
 * classigo(styles.button, styles['button--primary'], isLarge && styles['button--large'])
 * ```
 * 
 * @tip Use `&&` instead of ternary operators for better performance
 * @tip Template literals work perfectly with classigo
 */
function classigo(...classes: (string | undefined | null | false)[]): string {
  let result = '';

  for (let i = 0; i < classes.length; i++) {
    const cls = classes[i];
    result = cls ? appendClass(result, cls) : result;
  }
  return result;
}

export default classigo;
