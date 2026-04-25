# classigo

> Fast class name utility for TypeScript — strings, objects, zero dependencies.

[![npm](https://img.shields.io/npm/v/classigo.svg)](https://www.npmjs.com/package/classigo)
[![downloads](https://img.shields.io/npm/dw/classigo.svg)](https://www.npmjs.com/package/classigo)
[![bundle size](https://img.shields.io/badge/minified-217B-brightgreen)](https://bundlephobia.com/package/classigo)
[![MIT](https://img.shields.io/npm/l/classigo.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-%3E%3D5.0-blue.svg)](https://www.typescriptlang.org/)

> _Version française : [README.fr.md](./README.fr.md)_

```ts
import classigo from "classigo";

// Strings + falsy values
classigo("btn", isActive && "btn--active", isDisabled && "btn--disabled");
// → "btn btn--active"

// Object syntax
classigo("btn", {
  "btn--active":   isActive,
  "btn--disabled": isDisabled,
  "btn--loading":  isLoading,
});
// → "btn btn--active"

// Mixed
classigo("btn", `btn--${variant}`, { "btn--active": isActive });
// → "btn btn--primary btn--active"
```

## Why classigo?

Honestly — not because the performance difference will matter in your app. A render cycle costs thousands of nanoseconds; your className utility costs tens. Nobody has ever shipped a slow product because they used clsx.

The real reason to use classigo is the **contract**. It does not support arrays, numbers, or nested calls — deliberately. That means:

- Passing an array is a **TypeScript compile error**, not a silent runtime surprise.
- The types accurately describe what the function actually does.
- The bundle is small because there is no code for cases the function doesn't handle.

| | classigo | classigo/lite | clsx | classnames |
| :--- | :---: | :---: | :---: | :---: |
| Strings + falsy values | ✅ | ✅ | ✅ | ✅ |
| Object syntax (`{ [cls]: boolean }`) | ✅ | ❌ | ✅ | ✅ |
| Arrays / nested calls | ❌ | ❌ | ✅ | ✅ |
| Numbers | ❌ | ❌ | ✅ | ✅ |
| ESM only | ✅ | ✅ | ✅ | ❌ |
| Zero dependencies | ✅ | ✅ | ✅ | ✅ |
| Minified size | **217B** | **137B** | ~560B | ~1.1kB |

**When to use classigo:** you control all inputs — class names come from strings, template literals, conditionals, or objects. That covers the vast majority of component code in React / Vue / Svelte.

**When to use clsx instead:** you receive class lists from an external source (CMS, config, API) that may be arrays or nested structures, or a utility in your codebase returns `string[]` that you want to pass directly without spreading.

```ts
// classigo covers this — you control the inputs
classigo("btn", `btn--${variant}`, { "btn--active": isActive })

// clsx covers this — external array of unknown shape
const rules = fetchClassRulesFromCMS(); // (string | string[])[]
clsx(...rules)

// the spread workaround works when you know the array is flat
classigo(...myKnownFlatArray)  // ✅ fine
classigo(...myUnknownArray)    // ❌ breaks if any element is itself an array
```

**Already using clsx?** Don't migrate. The difference isn't perceptible in a real app. classigo makes sense if you're starting fresh and want a minimal, strict-contract utility — or if you just prefer knowing that an accidental array at a call site is caught at compile time rather than silently joined wrong.

## Do you even need a class utility?

For a handful of conditionals, you might not:

```ts
// Perfectly fine without a library
const cls = ["btn", isActive && "btn--active", isDisabled && "btn--disabled"]
  .filter(Boolean)
  .join(" ");
```

The array approach is readable but allocates a new array every call. Once your component re-renders hundreds of times per second, or your design system calls a class util in every component, that allocation adds up. A tight utility that does one string concatenation pass pays for itself in high-frequency render paths.

## Install

```sh
bun add classigo
# or
npm i classigo
# or
pnpm add classigo
```

Requires TypeScript **≥ 5.0**. Zero runtime dependencies.

## API

### `classigo(...classes)`

Combines class names, filtering out falsy values. Accepts strings, falsy values (`false`, `null`, `undefined`), and objects (`{ [className]: boolean }`).

```ts
import classigo from "classigo";
// or
import { classigo } from "classigo";
```

```ts
// Strings
classigo("btn", "btn--primary")
// → "btn btn--primary"

// Falsy values are skipped
classigo("btn", false, null, undefined, "btn--active")
// → "btn btn--active"

// Conditional with &&
classigo("btn", isActive && "btn--active")
// → "btn btn--active"  (when isActive is true)
// → "btn"              (when isActive is false)

// Object — each key is included when its value is truthy
classigo("btn", { "btn--active": isActive, "btn--disabled": isDisabled })
// → "btn btn--active"

// Template literals
classigo(`card--${variant}`, `card--${size}`)
// → "card--primary card--lg"

// CSS Modules pattern
classigo(styles.root, { [styles.active]: isActive })
// → "root active"  (when isActive is true)
```

**Type signature:**

```ts
type ClassObject = Record<string, boolean | null | undefined>;
type ClassValue  = string | false | null | undefined | ClassObject;

function classigo(...classes: ClassValue[]): string;
```

### `classigo/lite`

A strings-only variant — no object support, smallest possible bundle (137B). Useful when you control all inputs and never need object syntax.

```ts
import classigo from "classigo/lite";
// or
import { classigo } from "classigo/lite";
```

```ts
classigo("btn", isActive && "btn--active", isDisabled && "btn--disabled");
// → "btn btn--active"
```

**Type signature:**

```ts
type ClassLiteValue = string | false | null | undefined;

function classigo(...classes: ClassLiteValue[]): string;
```

Passing an object to `classigo/lite` is a **TypeScript compile error** — which is the point. If you want the type system to enforce that no object ever reaches this call site, use `/lite`.

## Migrating from v1

v2 has two breaking changes:

**1. ESM only.** CommonJS (`require("classigo")`) is no longer supported. If your project needs CJS, stay on v1 or use a bundler that converts ESM.

**2. Object syntax added.** This is backwards-compatible for pure string usage, but the published types now accept `ClassObject` alongside strings. If you have strict type assertions that assumed `ClassValue` was string-only, update them or switch to `classigo/lite`.

```ts
// v1
classigo("btn", isActive && "btn--active");          // ✅ still works

// v2 — new
classigo("btn", { "btn--active": isActive });         // ✅ object syntax
import classigoLite from "classigo/lite";             // ✅ strings-only export
```

There are no API changes beyond these two. The function signature is otherwise identical.

## Benchmarks

I bench because I like to know whether what I built is fast or slow — not because these numbers should drive your adoption decision. A className call costs tens of nanoseconds; a React render costs thousands. The bench exists for curiosity and for catching regressions if someone submits a PR that changes the hot path.

That said, here are the numbers. Measured with [mitata](https://github.com/nicolo-ribaudo/mitata) on an i7-14700KF, Bun 1.2.13. Lower is better.

| Scenario | classigo v2 | classigo/lite | clsx | classnames |
| :--- | ---: | ---: | ---: | ---: |
| 3 strings | **8.67 ns** | 11.54 ns | 24.46 ns | 18.03 ns |
| conditional (4 args, 2× `&&`) | **17.24 ns** | 13.42 ns | 31.97 ns | 18.00 ns |
| complex (8 args, template literals) | **26.38 ns** | 27.94 ns | 58.27 ns | 34.39 ns |
| re-render — boolean toggle | 9.21 ns | **8.66 ns** | 17.08 ns | 11.98 ns |
| object syntax (3-key object) | **20.34 ns** | — | 29.96 ns | 24.96 ns |
| design-system (20 dynamic args) | **96.45 ns** | 106.28 ns | 148.82 ns | 121.79 ns |
| css-modules (15-key object) | **71.73 ns** | — | 80.45 ns | 83.61 ns |

What the numbers actually tell you:

- classigo is faster because it does less — no array handling, no recursion, no number coercion. The speed difference is a direct consequence of the narrower API, not an algorithmic breakthrough.
- The gap compresses as workload grows (15-key object: 1.12× vs clsx). When `for...in` iteration dominates, every library converges to the same cost.
- `/lite` wins on pure boolean-toggle patterns — no `typeof` check at all, shortest possible loop. Use it when you never need object syntax.
- These numbers will not move the needle in your app. Profile your renders before concluding classnames is your bottleneck.

Run the suite yourself:

```sh
bun run bench
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guidelines. The short version: use Bun, follow Conventional Commits, run `bun run test && bun run build` before opening a PR, and include a bench delta if you touch `src/index.ts` or `src/lite.ts`.

## License

MIT © [SUP2Ak](https://github.com/SUP2Ak)
