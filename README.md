# 🎯 Classigo

**Ultra-optimized class name utility for CSS Modules**

[![npm version](https://badge.fury.io/js/classigo.svg)](https://badge.fury.io/js/classigo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/badge/bundle%20size-159B-brightgreen)](https://bundlephobia.com/package/classigo)

## 🚀 Features

- **⚡ Ultra-fast**: Optimized for maximum performance (52M ops/sec)
- **🎯 Simple API**: Clean and intuitive function signature
- **🔧 TypeScript**: Full TypeScript support with type safety
- **📦 Lightweight**: 159B (59% smaller than clsx)
- **🔄 Standalone**: Pure JavaScript utility, works everywhere
- **🎨 CSS Modules**: Perfect integration with CSS/SCSS Modules
- **📦 Multi-format**: ES Modules, CommonJS, and UMD support

## 📦 Installation

```bash
npm install classigo
```

```bash
yarn add classigo
```

```bash
pnpm add classigo
```

```bash
bun add classigo
```



## 🎯 Quick Start

```typescript
import classigo from 'classigo';
import styles from './Button.module.css';

// Basic usage
const className = classigo(
  styles.button,
  styles['button--primary'],
  styles['button--large']
);

// With conditions
const className = classigo(
  styles.button,
  styles['button--primary'],
  isLarge && styles['button--large'],
  isDisabled && styles['button--disabled']
);

// With template literals
const className = classigo(
  styles.button,
  styles[`button--${variant}`],
  isLarge && styles['button--large']
);
```



## ⚡ Performance

**classigo** is significantly faster and smaller than alternatives:

- **52.3M ops/sec** vs clsx (45.1M ops/sec) - **16% faster**
- **159B** vs clsx (388B) - **59% smaller**
- **Consistently outperforms** Array.filter().join() and other utilities

### Benchmark Results

| Test | classigo | clsx | classnames |
|------|----------|------|------------|
| Basic classes | 🥇 43.2M ops/sec | 🥈 38.5M ops/sec | 🥉 37.3M ops/sec |
| Conditional classes | 🥇 64.4M ops/sec | 🥈 54.3M ops/sec | 🥉 50.3M ops/sec |
| Template literals | 🥇 62.2M ops/sec | 🥈 52.5M ops/sec | 🥉 50.4M ops/sec |
| Falsy values | 🥇 55.6M ops/sec | 🥈 48.8M ops/sec | 🥉 45.3M ops/sec |
| Complex SCSS | 🥇 36.0M ops/sec | 🥈 31.4M ops/sec | 🥉 25.1M ops/sec |

### Bundle Size Comparison

| Library | CJS | ESM | UMD |
|---------|-----|-----|-----|
| **classigo** | **159B** | **195B** | **359B** |
| clsx | 397B | 388B | 543B |
| classnames | 1.5KB | ❌ | ❌ |

*Benchmarks run with 1M iterations × 20 rounds*

For more information, see [docs/README.md](./docs/README.md).

## 🎮 Live Examples

- **[All Examples](https://sup2ak.github.io/classigo/)** - Interactive demos showcase
- **[React Demo](https://sup2ak.github.io/classigo/react-demo/)** - Interactive button component with CSS Modules
- **[Vue Demo](https://sup2ak.github.io/classigo/vue-demo/)** - Vue 3 component with Composition API
- **[Svelte Demo](https://sup2ak.github.io/classigo/svelte-demo/)** - Svelte component with reactivity
- **[Vanilla JS Demo](https://sup2ak.github.io/classigo/vanilla-demo/)** - Pure JavaScript implementation

*Examples show real-time className generation and performance comparisons*

## 🤝 Contributing

**Quick start:**
```bash
git clone https://github.com/SUP2Ak/classigo.git
cd classigo
pnpm install
pnpm run build
```

## 🙏 Acknowledgments

This utility was inspired by and builds upon the excellent work of:

- **[clsx](https://github.com/lukeed/clsx)** by Luke Edwards
- **[classnames](https://github.com/JedWatson/classnames)** by Jed Watson

This utility was primarily built for my personal use, but if it helps anyone else, that's great!

## 📄 License

MIT © [SUP2Ak](https://github.com/SUP2Ak)

---

**Made with ❤️ for the CSS Modules community**
