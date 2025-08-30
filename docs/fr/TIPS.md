# 💡 Conseils

## ✅ À faire

**Utilisez `&&` pour les conditions:**
```typescript
const className = classigo(
  'button',
  isLarge && 'button--large',
  isDisabled && 'button--disabled'
);
```

**Utilisez les template literals:**
```typescript
const className = classigo(
  'button',
  `button--${variant}`,
  `button--${size}`
);
```

## ❌ À éviter

**N'utilisez pas la syntaxe objet:**
```typescript
// Ça ne marchera pas
const className = classigo({
  'button': true,
  'button--primary': isPrimary
});
```

**N'utilisez pas la syntaxe array:**
```typescript
// Ça ne marchera pas
const className = classigo([
  'button',
  'button--primary'
]);
```

**N'utilisez pas les ternaires:**
```typescript
// Plus lent
const className = classigo(
  'button',
  isLarge ? 'button--large' : ''
);
```

## 🎯 Performance

- Utilisez `&&` au lieu des ternaires
- Utilisez les template literals pour les chaînes dynamiques
- Évitez le pattern `Array.filter().join()`
