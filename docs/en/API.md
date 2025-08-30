# 🔧 API Reference

## Function Signature

```typescript
function classigo(...classes: (string | undefined | null | false)[]): string
```

## Parameters

- `...classes`: Variable number of class names or falsy values

## Returns

- `string`: Combined class names separated by spaces

## Examples

### Basic Usage

```typescript
import classigo from 'classigo';

// Basic classes
classigo('button', 'button--primary', 'button--large')
// → "button button--primary button--large"

// With falsy values
classigo('button', null, undefined, false, 'button--primary')
// → "button button--primary"

// Empty result
classigo(null, undefined, false)
// → ""
```

### Conditional Classes

```typescript
import classigo from 'classigo';

// With conditions
classigo('button', 'button--primary', isLarge && 'button--large')
// → "button button--primary" (if isLarge is false)
// → "button button--primary button--large" (if isLarge is true)

// Multiple conditions
classigo(
  'button',
  'button--primary',
  isLarge && 'button--large',
  isDisabled && 'button--disabled'
)
```

### Template Literals

```typescript
import classigo from 'classigo';

// Dynamic classes
classigo('button', `button--${variant}`, `button--${size}`)
// → "button button--primary button--large" (if variant = 'primary', size = 'large')

// Mixed with conditions
classigo(
  'button',
  `button--${variant}`,
  isLarge && 'button--large'
)
```

### CSS Modules

```typescript
import classigo from 'classigo';
import styles from './Button.module.css';

// Static classes
classigo(styles.button, styles['button--primary'], styles['button--large'])

// Dynamic classes
classigo(
  styles.button,
  styles[`button--${variant}`],
  isLarge && styles['button--large']
)
```

## TypeScript Support

```typescript
import classigo from 'classigo';

// Type-safe usage
const className: string = classigo(
  'button',
  'button--primary',
  isLarge && 'button--large'
);

// With CSS Modules
import styles from './Button.module.css';

const className: string = classigo(
  styles.button,
  styles['button--primary'],
  isLarge && styles['button--large']
);
```

## Supported Values

| Type | Example | Result |
|------|---------|--------|
| `string` | `'button'` | ✅ Included |
| `undefined` | `undefined` | ❌ Filtered out |
| `null` | `null` | ❌ Filtered out |
| `false` | `false` | ❌ Filtered out |
| `0` | `0` | ❌ Filtered out |
| `''` | `''` | ❌ Filtered out |

## Not Supported

- **Objects**: `{ 'button': true }` ❌
- **Arrays**: `['button', 'primary']` ❌
- **Functions**: `() => 'button'` ❌
- **Numbers**: `123` ❌
- **Booleans**: `true` ❌
