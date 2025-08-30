# 🔧 Référence API

## Signature de Fonction

```typescript
function classigo(...classes: (string | undefined | null | false)[]): string
```

## Paramètres

- `...classes`: Nombre variable de noms de classes ou valeurs falsy

## Retourne

- `string`: Noms de classes combinés séparés par des espaces

## Exemples

### Utilisation Basique

```typescript
import classigo from 'classigo';

// Classes de base
classigo('button', 'button--primary', 'button--large')
// → "button button--primary button--large"

// Avec valeurs falsy
classigo('button', null, undefined, false, 'button--primary')
// → "button button--primary"

// Résultat vide
classigo(null, undefined, false)
// → ""
```

### Classes Conditionnelles

```typescript
import classigo from 'classigo';

// Avec conditions
classigo('button', 'button--primary', isLarge && 'button--large')
// → "button button--primary" (si isLarge est false)
// → "button button--primary button--large" (si isLarge est true)

// Conditions multiples
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

// Classes dynamiques
classigo('button', `button--${variant}`, `button--${size}`)
// → "button button--primary button--large" (si variant = 'primary', size = 'large')

// Mixte avec conditions
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

// Classes statiques
classigo(styles.button, styles['button--primary'], styles['button--large'])

// Classes dynamiques
classigo(
  styles.button,
  styles[`button--${variant}`],
  isLarge && styles['button--large']
)
```

## Support TypeScript

```typescript
import classigo from 'classigo';

// Utilisation type-safe
const className: string = classigo(
  'button',
  'button--primary',
  isLarge && 'button--large'
);

// Avec CSS Modules
import styles from './Button.module.css';

const className: string = classigo(
  styles.button,
  styles['button--primary'],
  isLarge && styles['button--large']
);
```

## Valeurs Supportées

| Type | Exemple | Résultat |
|------|---------|----------|
| `string` | `'button'` | ✅ Inclus |
| `undefined` | `undefined` | ❌ Filtré |
| `null` | `null` | ❌ Filtré |
| `false` | `false` | ❌ Filtré |
| `0` | `0` | ❌ Filtré |
| `''` | `''` | ❌ Filtré |

## Non Supporté

- **Objets**: `{ 'button': true }` ❌
- **Arrays**: `['button', 'primary']` ❌
- **Fonctions**: `() => 'button'` ❌
- **Nombres**: `123` ❌
- **Booléens**: `true` ❌
