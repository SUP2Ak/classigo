# 💡 Tips

## ✅ Do

**Use `&&` for conditions:**
```typescript
const className = classigo(
  'button',
  isLarge && 'button--large',
  isDisabled && 'button--disabled'
);
```

**Use template literals:**
```typescript
const className = classigo(
  'button',
  `button--${variant}`,
  `button--${size}`
);
```

## ❌ Don't

**Don't use object syntax:**
```typescript
// This won't work
const className = classigo({
  'button': true,
  'button--primary': isPrimary
});
```

**Don't use array syntax:**
```typescript
// This won't work
const className = classigo([
  'button',
  'button--primary'
]);
```

**Don't use ternaries:**
```typescript
// Slower
const className = classigo(
  'button',
  isLarge ? 'button--large' : ''
);
```

## 🎯 Performance

- Use `&&` instead of ternaries
- Use template literals for dynamic strings
- Avoid `Array.filter().join()` pattern
