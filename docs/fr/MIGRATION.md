# 🔄 Migration

## Depuis classnames

**Avant:**
```typescript
import classNames from 'classnames';

const className = classNames('button', {
  'button--primary': true,
  'button--large': isLarge
});
```

**Après:**
```typescript
import classigo from 'classigo';

const className = classigo('button', 'button--primary', isLarge && 'button--large');
```

## Depuis clsx

**Avant:**
```typescript
import clsx from 'clsx';

const className = clsx('button', {
  'button--primary': true,
  'button--large': isLarge
});
```

**Après:**
```typescript
import classigo from 'classigo';

const className = classigo('button', 'button--primary', isLarge && 'button--large');
```

## ✅ Checklist

- [ ] Remplacer `import classNames from 'classnames'` par `import classigo from 'classigo'`
- [ ] Remplacer `import clsx from 'clsx'` par `import classigo from 'classigo'`
- [ ] Convertir la syntaxe objet en conditions `&&`
- [ ] Tester vos composants
