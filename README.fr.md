# classigo

> Utilitaire de class names rapide pour TypeScript — strings, objets, zéro dépendance.

[![npm](https://img.shields.io/npm/v/classigo.svg)](https://www.npmjs.com/package/classigo)
[![downloads](https://img.shields.io/npm/dw/classigo.svg)](https://www.npmjs.com/package/classigo)
[![bundle size](https://img.shields.io/badge/minified-217B-brightgreen)](https://bundlephobia.com/package/classigo)
[![MIT](https://img.shields.io/npm/l/classigo.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-%3E%3D5.0-blue.svg)](https://www.typescriptlang.org/)

> _English version: [README.md](./README.md) (reference)_

```ts
import classigo from "classigo";

// Strings + valeurs falsy
classigo("btn", isActive && "btn--active", isDisabled && "btn--disabled");
// → "btn btn--active"

// Syntaxe objet
classigo("btn", {
  "btn--active":   isActive,
  "btn--disabled": isDisabled,
  "btn--loading":  isLoading,
});
// → "btn btn--active"

// Mixte
classigo("btn", `btn--${variant}`, { "btn--active": isActive });
// → "btn btn--primary btn--active"
```

## Pourquoi classigo ?

Honnêtement — pas parce que la différence de performance va compter dans ton app. Un cycle de rendu coûte des milliers de nanosecondes ; ton utilitaire de className en coûte des dizaines. Personne n'a jamais livré un produit lent à cause de clsx.

La vraie raison d'utiliser classigo c'est le **contrat**. Il ne supporte pas les tableaux, les nombres, ni les appels imbriqués — délibérément. Ça signifie :

- Passer un tableau est une **erreur de compilation TypeScript**, pas une surprise silencieuse au runtime.
- Les types décrivent précisément ce que la fonction fait réellement.
- Le bundle est petit parce qu'il n'y a pas de code pour des cas que la fonction ne gère pas.

| | classigo | classigo/lite | clsx | classnames |
| :--- | :---: | :---: | :---: | :---: |
| Strings + valeurs falsy | ✅ | ✅ | ✅ | ✅ |
| Syntaxe objet (`{ [cls]: boolean }`) | ✅ | ❌ | ✅ | ✅ |
| Tableaux / appels imbriqués | ❌ | ❌ | ✅ | ✅ |
| Nombres | ❌ | ❌ | ✅ | ✅ |
| ESM uniquement | ✅ | ✅ | ✅ | ❌ |
| Zéro dépendance | ✅ | ✅ | ✅ | ✅ |
| Taille minifiée | **217B** | **137B** | ~560B | ~1.1kB |

**Quand utiliser classigo :** tu contrôles tous les inputs — les class names viennent de strings, template literals, conditionnels ou objets. Ça couvre la grande majorité du code composant React / Vue / Svelte.

**Quand utiliser clsx à la place :** tu reçois des listes de classes depuis une source externe (CMS, config, API) qui peuvent être des tableaux ou des structures imbriquées, ou une fonction dans ta codebase retourne du `string[]` que tu veux passer directement sans spread.

```ts
// classigo couvre ça — tu contrôles les inputs
classigo("btn", `btn--${variant}`, { "btn--active": isActive })

// clsx couvre ça — tableau externe de forme inconnue
const rules = fetchClassRulesFromCMS(); // (string | string[])[]
clsx(...rules)

// le workaround spread fonctionne quand tu sais que le tableau est plat
classigo(...myKnownFlatArray)  // ✅ ok
classigo(...myUnknownArray)    // ❌ casse si un élément est lui-même un tableau
```

**Tu utilises déjà clsx ?** Ne migre pas. La différence n'est pas perceptible dans une vraie app. classigo a du sens si tu pars de zéro et veux un utilitaire minimal avec un contrat strict — ou si tu préfères simplement qu'un tableau accidentel à un point d'appel soit attrapé à la compilation plutôt que silencieusement joint de travers.

## Tu as vraiment besoin d'un utilitaire de class ?

Pour quelques conditionnels, peut-être pas :

```ts
// Parfaitement lisible sans librairie
const cls = ["btn", isActive && "btn--active", isDisabled && "btn--disabled"]
  .filter(Boolean)
  .join(" ");
```

L'approche tableau est lisible mais alloue un nouveau tableau à chaque appel. Quand ton composant re-render des centaines de fois par seconde, ou quand ton design system appelle un utilitaire de class dans chaque composant, ces allocations s'accumulent. Un utilitaire resserré qui fait une seule passe de concaténation de string rentabilise son usage sur les chemins de rendu haute fréquence.

## Installation

```sh
bun add classigo
# ou
npm i classigo
# ou
pnpm add classigo
```

Requiert TypeScript **≥ 5.0**. Zéro dépendance runtime.

## API

### `classigo(...classes)`

Combine les class names en filtrant les valeurs falsy. Accepte des strings, des valeurs falsy (`false`, `null`, `undefined`), et des objets (`{ [className]: boolean }`).

```ts
import classigo from "classigo";
// ou
import { classigo } from "classigo";
```

```ts
// Strings
classigo("btn", "btn--primary")
// → "btn btn--primary"

// Les valeurs falsy sont ignorées
classigo("btn", false, null, undefined, "btn--active")
// → "btn btn--active"

// Conditionnel avec &&
classigo("btn", isActive && "btn--active")
// → "btn btn--active"  (quand isActive est true)
// → "btn"              (quand isActive est false)

// Objet — chaque clé est incluse quand sa valeur est truthy
classigo("btn", { "btn--active": isActive, "btn--disabled": isDisabled })
// → "btn btn--active"

// Template literals
classigo(`card--${variant}`, `card--${size}`)
// → "card--primary card--lg"

// Pattern CSS Modules
classigo(styles.root, { [styles.active]: isActive })
// → "root active"  (quand isActive est true)
```

**Signature de type :**

```ts
type ClassObject = Record<string, boolean | null | undefined>;
type ClassValue  = string | false | null | undefined | ClassObject;

function classigo(...classes: ClassValue[]): string;
```

### `classigo/lite`

Une variante strings uniquement — pas de support objet, bundle minimal (137B). Utile quand tu contrôles tous les inputs et n'as jamais besoin de la syntaxe objet.

```ts
import classigo from "classigo/lite";
// ou
import { classigo } from "classigo/lite";
```

```ts
classigo("btn", isActive && "btn--active", isDisabled && "btn--disabled");
// → "btn btn--active"
```

**Signature de type :**

```ts
type ClassLiteValue = string | false | null | undefined;

function classigo(...classes: ClassLiteValue[]): string;
```

Passer un objet à `classigo/lite` est une **erreur de compilation TypeScript** — c'est précisément l'intérêt. Si tu veux que le système de types garantisse qu'aucun objet n'atteindra ce point d'appel, utilise `/lite`.

## Migration depuis v1

v2 introduit deux changements cassants :

**1. ESM uniquement.** CommonJS (`require("classigo")`) n'est plus supporté. Si ton projet a besoin de CJS, reste sur v1 ou utilise un bundler qui convertit l'ESM.

**2. Syntaxe objet ajoutée.** C'est rétrocompatible pour un usage purement string, mais les types publiés acceptent maintenant `ClassObject` aux côtés des strings. Si tu as des assertions de type strictes qui supposaient que `ClassValue` était string-only, mets-les à jour ou passe à `classigo/lite`.

```ts
// v1
classigo("btn", isActive && "btn--active");          // ✅ fonctionne toujours

// v2 — nouveau
classigo("btn", { "btn--active": isActive });         // ✅ syntaxe objet
import classigoLite from "classigo/lite";             // ✅ export strings-only
```

Aucun autre changement d'API. La signature de la fonction est identique par ailleurs.

## Benchmarks

Je bench parce que j'aime savoir si ce que j'ai construit est rapide ou lent — pas parce que ces chiffres devraient guider ton choix d'adoption. Un appel de className coûte des dizaines de nanosecondes ; un rendu React en coûte des milliers. Le bench existe par curiosité et pour attraper les régressions si quelqu'un soumet une PR qui change le hot path.

Cela dit, voilà les chiffres. Mesuré avec [mitata](https://github.com/nicolo-ribaudo/mitata) sur un i7-14700KF, Bun 1.2.13. Plus bas = meilleur.

| Scénario | classigo v2 | classigo/lite | clsx | classnames |
| :--- | ---: | ---: | ---: | ---: |
| 3 strings | **8.67 ns** | 11.54 ns | 24.46 ns | 18.03 ns |
| conditionnel (4 args, 2× `&&`) | **17.24 ns** | 13.42 ns | 31.97 ns | 18.00 ns |
| complexe (8 args, template literals) | **26.38 ns** | 27.94 ns | 58.27 ns | 34.39 ns |
| re-render — toggle boolean | 9.21 ns | **8.66 ns** | 17.08 ns | 11.98 ns |
| syntaxe objet (3 clés) | **20.34 ns** | — | 29.96 ns | 24.96 ns |
| design-system (20 args dynamiques) | **96.45 ns** | 106.28 ns | 148.82 ns | 121.79 ns |
| css-modules (objet 15 clés) | **71.73 ns** | — | 80.45 ns | 83.61 ns |

Ce que les chiffres disent vraiment :

- classigo est plus rapide parce qu'il fait moins — pas de gestion de tableaux, pas de récursion, pas de coercition de nombres. La différence de vitesse est une conséquence directe de l'API plus étroite, pas d'une percée algorithmique.
- L'écart se réduit quand la charge augmente (objet 15 clés : 1.12× vs clsx). Quand l'itération `for...in` domine, chaque librairie converge vers le même coût.
- `/lite` gagne sur les patterns boolean-toggle purs — aucun check `typeof`, boucle la plus courte possible. Utilise-le quand tu n'as jamais besoin de la syntaxe objet.
- Ces chiffres ne déplaceront pas l'aiguille dans ton app. Profile tes rendus avant de conclure que les class names sont ton goulot d'étranglement.

Lance la suite toi-même :

```sh
bun run bench
```

## Contribuer

Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour les règles complètes. La version courte : utilise Bun, suis les Conventional Commits, lance `bun run test && bun run build` avant d'ouvrir une PR, et inclus un delta de bench si tu touches `src/index.ts` ou `src/lite.ts`.

## Licence

MIT © [SUP2Ak](https://github.com/SUP2Ak)
