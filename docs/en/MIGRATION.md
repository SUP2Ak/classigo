# 🔄 Migration

## From classnames

**Before:**
```typescript
import classNames from 'classnames';

const className = classNames('button', {
  'button--primary': true,
  'button--large': isLarge
});
```

**After:**
```typescript
import classigo from 'classigo';

const className = classigo('button', 'button--primary', isLarge && 'button--large');
```

## From clsx

**Before:**
```typescript
import clsx from 'clsx';

const className = clsx('button', {
  'button--primary': true,
  'button--large': isLarge
});
```

**After:**
```typescript
import classigo from 'classigo';

const className = classigo('button', 'button--primary', isLarge && 'button--large');
```

## ✅ Checklist

- [ ] Replace `import classNames from 'classnames'` with `import classigo from 'classigo'`
- [ ] Replace `import clsx from 'clsx'` with `import classigo from 'classigo'`
- [ ] Convert object syntax to `&&` conditions
- [ ] Test your components
