# Contribuer à classigo

Merci d'envisager une contribution. Quelques règles gardent le projet sain — merci de les lire avant d'ouvrir une PR.

> 🇬🇧 English version : [CONTRIBUTING.md](./CONTRIBUTING.md) (la version faisant foi).

## Langue

**Les titres de PR, descriptions, messages de commit, commentaires de code et discussions doivent être en anglais.** Je suis francophone moi-même, mais l'anglais garde le projet accessible à tout le monde. Les issues aussi — le français est ok en DM, pas sur le tracker.

Cette page est traduite pour faciliter la lecture, mais **la version anglaise fait foi** en cas de divergence, et **ta PR doit être rédigée en anglais**.

## Avant d'ouvrir une PR

1. **Fork** le repo et crée une branche à partir de `main`.
2. **Utilise Bun** comme gestionnaire de paquets — `bun install`, pas `npm`/`pnpm`/`yarn`. Le lockfile est `bun.lock` ; mélanger les gestionnaires provoque des conflits inutiles que je ne déboguerai pas pour toi.
3. **Format, typecheck, tests et build en local** :

   ```sh
   bun install
   bun run format:check
   bun run typecheck
   bun run test
   bun run build
   ```

   La CI tourne les mêmes checks sur chaque PR — si un seul plante, la PR ne merge pas.

4. **Si le changement touche le cœur** (`src/index.ts`, `src/lite.ts`, `src/types.ts`), lance le bench et inclus le delta :

   ```sh
   bun run bench
   ```

   Le pitch de classigo c'est la performance. Un changement qui régresse le hot path a besoin d'une bonne raison.

## Pipeline de build

Le build se fait en deux étapes — ne casse aucune des deux :

```sh
tsc -p tsconfig.build.json   # émet uniquement les déclarations .d.ts
bun build src/index.ts src/lite.ts --outdir dist --format esm --minify  # émet le JS minifié
```

`bun run build` lance les deux. Si tu ajoutes un nouveau point d'entrée, mets à jour à la fois le script `build` dans `package.json` et la map `exports`.

## Scope d'une PR

- **Une feature / un fix par PR.**
- **Petit et ciblé > gros et étalé.**
- **Décris ce qui change et pourquoi** dans le corps de la PR. Un delta de bench ou un test qui reproduit le bug rend la review nettement plus rapide.
- **Pas de reformatage opportuniste.** Prettier tourne en CI — ne mélange pas "j'ai tout reformaté" avec un vrai changement de logique.

## Tests

- Tout changement runtime doit avoir un test dans [`tests/runtime.test.ts`](./tests/runtime.test.ts).
- N'affaiblis pas un test existant pour faire passer un changement. Si un test est faux, explique pourquoi dans la PR et corrige-le explicitement.

## Style de commit

Suis [Conventional Commits](https://www.conventionalcommits.org/fr/v1.0.0/) :

```
<type>(<scope>): <résumé court>
```

- **Types autorisés** : `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `chore`, `build`, `ci`, `style`.
- **Scope** correspond à la zone touchée : `core`, `lite`, `types`, `bench`, `docs`, `ci`.
- **Résumé** : présent, impératif, en minuscules, pas de point final.
- **Pas de gitmoji** dans les messages de commit.
- **Breaking changes** : ajoute `!` après le scope (ex. `feat(core)!: ...`) et un footer `BREAKING CHANGE:` qui explique la migration.

> Rappel : le commit lui-même reste en anglais, même si la PR est discutée en français ailleurs.

Exemples :

```
feat(lite): add classigo/lite strings-only export
perf(core): invert typeof check to favour string fast path
fix(types): widen ClassObject values to accept null
docs(readme): document migration from v1
build(ci): add minification step via bun build
```

## Ce sur quoi je vais pousser back

- Ajouter des dépendances. classigo est zéro-dep et je veux que ça le reste.
- Des features qui régressent le hot path sans gain clair.
- Le support des tableaux ou des appels imbriqués — c'est un non-objectif délibéré. Utilise clsx si tu en as besoin.
- Des breaking changes sans note de migration.

## Signaler un bug

Ouvre une issue avec :
- Version de classigo, runtime (Bun/Node/Deno) + version, version TS.
- Une reproduction **minimale** — idéalement un test qui plante à coller dans `tests/runtime.test.ts`.
- Ce que tu attendais vs. ce qui s'est passé.

## Sécurité

Si tu trouves quelque chose lié à la sécurité, n'ouvre pas d'issue publique. Utilise [le système de signalement privé de GitHub](https://github.com/SUP2Ak/classigo/security/advisories/new) à la place.

---

Merci d'être arrivé jusqu'ici. Les PR qui suivent ce qui est au-dessus mergent vite.
