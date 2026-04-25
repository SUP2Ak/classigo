# Contributing to classigo

Thanks for considering a contribution. A few guidelines keep the project healthy — please read them before opening a PR.

> 🇫🇷 Version française : [CONTRIBUTING.fr.md](./CONTRIBUTING.fr.md). PRs must still be written in English (see below).

## Language

**PR titles, descriptions, commit messages, code comments, and discussion must be in English.** I'm francophone myself, but English keeps the project accessible to everyone. Open issues in English too — French is fine in DMs, not on the tracker.

## Before you open a PR

1. **Fork** the repo and create a branch off `main`.
2. **Use Bun** as your package manager — `bun install`, not `npm`/`pnpm`/`yarn`. The lockfile is `bun.lock`; mixing managers causes spurious conflicts I won't debug for you.
3. **Format, typecheck, test, and build locally**:

   ```sh
   bun install
   bun run format:check
   bun run typecheck
   bun run test
   bun run build
   ```

   CI runs the same gates on every PR — if one fails, the PR won't merge.

4. **If the change touches the core** (`src/index.ts`, `src/lite.ts`, `src/types.ts`), run the bench and include the delta:

   ```sh
   bun run bench
   ```

   classigo's pitch is performance. A change that regresses the hot path needs a good reason.

## Build pipeline

The build is a two-step process — don't break either:

```sh
tsc -p tsconfig.build.json   # emits .d.ts declarations only
bun build src/index.ts src/lite.ts --outdir dist --format esm --minify  # emits minified JS
```

`bun run build` runs both. If you add a new entry point, update both the `build` script in `package.json` and the `exports` map.

## PR scope

- **One feature / one fix per PR.**
- **Small and focused beats big and sprawling.**
- **Describe what changed and why** in the PR body. A bench delta or a failing test that reproduces the bug makes review significantly faster.
- **No drive-by reformatting.** Prettier runs in CI — don't mix "I reformatted everything" with actual logic changes.

## Tests

- Every runtime-facing change needs a test in [`tests/runtime.test.ts`](./tests/runtime.test.ts).
- Don't weaken existing tests to make a change pass. If a test is wrong, explain why in the PR and fix it explicitly.

## Commit style

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>(<scope>): <short summary>
```

- **Allowed types**: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `chore`, `build`, `ci`, `style`.
- **Scope** should match the area touched: `core`, `lite`, `types`, `bench`, `docs`, `ci`.
- **Summary**: present-tense imperative, lowercase, no trailing period.
- **No gitmoji** in commit messages.
- **Breaking changes**: add `!` after the scope (e.g. `feat(core)!: ...`) and a `BREAKING CHANGE:` footer explaining the migration.

Examples:

```
feat(lite): add classigo/lite strings-only export
perf(core): invert typeof check to favour string fast path
fix(types): widen ClassObject values to accept null
docs(readme): document migration from v1
build(ci): add minification step via bun build
```

## What I'll push back on

- Adding dependencies. classigo is zero-dep and I'd like to keep it that way.
- Features that regress the hot path without a clear payoff.
- Array or nested-call support — that's a deliberate non-goal. Use clsx if you need it.
- Breaking changes without a migration note.

## Reporting bugs

Open an issue with:
- classigo version, runtime (Bun/Node/Deno) + version, TS version.
- A **minimal** reproduction — ideally a failing test I can paste into `tests/runtime.test.ts`.
- What you expected vs. what happened.

## Security

If you find something security-relevant, don't open a public issue. Use [GitHub's private vulnerability reporting](https://github.com/SUP2Ak/classigo/security/advisories/new) instead.

---

Thanks for reading this far. PRs that follow the above tend to merge quickly.
