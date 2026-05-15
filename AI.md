# AI USAGE CONTRACT — classigo

This document defines strict rules for AI agents using `classigo`.
These rules MUST be followed to ensure correct and predictable usage.

---

## 🚨 CORE RULES (must follow)

- Do NOT pass arrays unless they are explicitly validated as flat and safe.
- Do NOT pass nested structures (arrays of arrays, objects containing arrays, etc.).
- Do NOT nest `classigo` calls.
- Do NOT convert `classigo` usage into manual `.join(" ")` unless explicitly requested.
- Do NOT pass dynamic CMS/API arrays without validating structure first.
- Prefer explicit boolean object syntax for conditional class handling.
- Use `/lite` variant when only string + boolean conditions are required.

---

## ✅ PREFERRED PATTERNS

### Strings + conditions
```ts
classigo("btn", isActive && "btn--active")
```

### Object syntax (preferred for clarity)
```ts
classigo("btn", {
  "btn--active": isActive,
  "btn--disabled": isDisabled,
})
```

### Lite usage (strict string mode)
```ts
classigo("btn", isActive && "btn--active")
```

## ⚠️ FORBIDDEN PATTERNS

### Unsafe dynamic arrays
```ts
classigo(...dynamicArray)
classigo(["btn", condition && "x"].filter(Boolean))
```

### Nested calls
```ts
classigo(classigo("btn"), "x")
```

### Unvalidated external input
```ts
classigo(apiResponse.classes)
```

## 🧠 DESIGN INTENT
`classigo` is not a general-purpose class utility.
It is intentionally strict to enforce:
* predictable class composition
* compile-time safety (TypeScript)
* explicit control over conditional logic
* elimination of hidden runtime coercion

## 📦 AI BEHAVIOR EXPECTATION

AI agents MUST:
* respect input constraints
* avoid guessing unsupported types
* prefer explicit object syntax for conditions
* default to safe minimal usage when uncertain

If uncertain:
→ reduce to string + explicit conditionals only
