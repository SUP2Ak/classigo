# Contributing to classigo

Thanks for considering a contribution. A few guidelines keep the project healthy — please read them before opening a PR.

> 🇫🇷 Version française disponible sur demande. PRs must be written in English (see below).

## Language

**PR titles, descriptions, commit messages, code comments, and discussion must be in English.** Open issues in English too.

## Before you open a PR

1. **Fork** the repo and create a branch off `main`.
2. **Use Bun** as your package manager — `bun install`, not `npm`/`pnpm`/`yarn`.
3. **Format, typecheck, and test locally**:

   ```sh
   bun install
   bun run format:check
   bun run typecheck
   bun run test
   bun run build
   ```

   CI runs the same gates on every PR — if one fails, the PR won't merge.

4. **If the change touches the core** (`src/index.ts`, `src/types.ts`), run the bench and include the delta:

   ```sh
   bun run bench
   ```

   classigo's pitch is perf. A change that regresses the hot path needs a good reason.

## PR scope

- **One feature / one fix per PR.**
- **Small and focused beats big and sprawling.**
- **Describe what changed and why** in the PR body.
- **No drive-by reformatting.**

## Tests

- Every runtime-facing change needs a test in [`tests/runtime.test.ts`](./tests/runtime.test.ts).
- Don't weaken existing tests to make a change pass.

## Commit style

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>(<scope>): <short summary>
```

- **Allowed types**: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `chore`, `build`, `ci`, `style`.
- **Scope** should match the area touched: `core`, `types`, `bench`, `docs`, `ci`.
- **Summary**: present-tense imperative, lowercase, no trailing period.
- **No gitmoji** in commit messages.

Examples:

```
feat(core): add object syntax support
perf(core): inline appendClass to remove call overhead
fix(types): widen ClassValue to accept readonly objects
docs(readme): document object syntax with CSS Modules example
```

## What I'll push back on

- Adding dependencies. classigo is zero-dep and I'd like to keep it that way.
- Features that regress the hot path without a clear payoff.
- Breaking changes without a migration note.

## Security

If you find something security-relevant, don't open a public issue. Use [GitHub's private vulnerability reporting](https://github.com/SUP2Ak/classigo/security/advisories/new) instead.
