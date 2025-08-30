# 🎯 Classigo

**Utilitaire ultra-optimisé pour la gestion des noms de classes avec CSS Modules**

[![npm version](https://badge.fury.io/js/classigo.svg)](https://badge.fury.io/js/classigo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Fonctionnalités

- **⚡ Ultra-rapide** : Optimisé pour des performances maximales (52M ops/sec)
- **🎯 API simple** : Signature de fonction propre et intuitive
- **🔧 TypeScript** : Support complet TypeScript avec sécurité des types
- **📦 Léger** : 159B (59% plus petit que clsx)
- **🔄 Autonome** : Utilitaire JavaScript pur, fonctionne partout
- **🎨 CSS Modules** : Intégration parfaite avec CSS/SCSS Modules
- **📦 Multi-format** : Support ES Modules, CommonJS et UMD

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



## 🎯 Démarrage Rapide

```typescript
import classigo from 'classigo';
import styles from './Button.module.css';

// Utilisation basique
const className = classigo(
  styles.button,
  styles['button--primary'],
  styles['button--large']
);

// Avec conditions
const className = classigo(
  styles.button,
  styles['button--primary'],
  isLarge && styles['button--large'],
  isDisabled && styles['button--disabled']
);

// Avec template literals
const className = classigo(
  styles.button,
  styles[`button--${variant}`],
  isLarge && styles['button--large']
);
```



## ⚡ Performance

**classigo** est significativement plus rapide et plus petit que les alternatives :

- **52.3M ops/sec** vs clsx (45.1M ops/sec) - **16% plus rapide**
- **159B** vs clsx (388B) - **59% plus petit**
- **Surpasse constamment** Array.filter().join() et autres utilitaires

### Résultats des Benchmarks

| Test | classigo | clsx | classnames |
|------|----------|------|------------|
| Classes de base | 🥇 43.2M ops/sec | 🥈 38.5M ops/sec | 🥉 37.3M ops/sec |
| Classes conditionnelles | 🥇 64.4M ops/sec | 🥈 54.3M ops/sec | 🥉 50.3M ops/sec |
| Template literals | 🥇 62.2M ops/sec | 🥈 52.5M ops/sec | 🥉 50.4M ops/sec |
| Valeurs falsy | 🥇 55.6M ops/sec | 🥈 48.8M ops/sec | 🥉 45.3M ops/sec |
| SCSS complexe | 🥇 36.0M ops/sec | 🥈 31.4M ops/sec | 🥉 25.1M ops/sec |

### Comparaison des Tailles de Bundle

| Bibliothèque | CJS | ESM | UMD |
|--------------|-----|-----|-----|
| **classigo** | **159B** | **195B** | **359B** |
| clsx | 397B | 388B | 543B |
| classnames | 1.5KB | ❌ | ❌ |

*Benchmarks exécutés avec 1M itérations × 20 rounds*

Pour plus d'informations, voir [docs/README.md](./docs/README.md).

## 🤝 Contribution

**Démarrage rapide:**
```bash
git clone https://github.com/SUP2Ak/classigo.git
cd classigo
pnpm install
pnpm run build
```

## 🙏 Remerciements

Cet utilitaire s'inspire et s'appuie sur l'excellent travail de :

- **[clsx](https://github.com/lukeed/clsx)** par Luke Edwards
- **[classnames](https://github.com/JedWatson/classnames)** par Jed Watson

Cet utilitaire a été principalement construit pour mon usage personnel, mais s'il aide quelqu'un d'autre, tant mieux !

## 📄 Licence

MIT © [SUP2Ak](https://github.com/SUP2Ak)

---

**Fait avec ❤️ pour la communauté CSS Modules**
