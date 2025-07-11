

# Single Version Policy

A while back, we hit a wall that's all too familiar in monorepo life: dependency chaos. It was a classic case of "One team upgrades a library, another lags behind, and suddenly the same codebase runs three versions of React. Debugging becomes archaeology. Upgrades turn into whack-a-mole. Everyone feels the pain."

We needed a new approach—one that would bring order, predictability, and speed. So we made a bold move: **one version to rule them all**.

## Why Single Version?

If a dependency is shared, its version should be too.

A Single Version Policy (SVP) means every package in the monorepo shares the same version of any given dependency. This approach unlocks powerful benefits for teams working together at scale:

* **Consistency**: No more version drift or mysterious bugs from mismatched libraries
* **Simplicity**: Upgrades become a single change, not a scavenger hunt
* **Smaller builds**: No duplicate dependencies bloating your bundles
* **Confidence**: Everyone knows exactly what's running in production

The result? Fewer surprises, faster reviews, and a codebase that feels like a team effort—not a patchwork.

## How We Made It Work

The key was making the right thing easy. We used pnpm's catalog feature to define all external dependency versions in one place:

```yaml
pnpm:
  catalog:
    react: 18.2.0
    typescript: ^5.0.0
    @types/node: ^20.0.0
```

Inside each package, dependencies point to the catalog:

```json
"dependencies": {
  "react": "catalog:"
}
```

Adding a new dependency? Run `pnpm add` from the package directory, then standardize it with a codemod (`pnpm dlx codemod@0.11 pnpm/catalog`). Internal packages use the `workspace:` protocol, keeping everything in sync:

```json
"@your-org/utils": "workspace:^"
```

External = `catalog:`\
Internal = `workspace:^`

No guesswork. No drift.

## Guardrails: Linting for Safety

A policy is only as strong as its enforcement. We wrote a custom ESLint rule to check every `package.json`:

* All external dependencies must use `catalog:`
* All internal dependencies must use `workspace:`

CI enforces it. If someone tries to sneak in a pinned version, the build fails. It's not glamorous, but it's essential.

## Tradeoffs and Lessons

SVP isn't magic; it means recurring coordinated upgrades—sometimes you need to fix several packages at once. But it's a single, visible change, not a slow drift. And, the investment up front pays off in long-term sanity. For rare edge cases, we allow a second named catalog (like `next-react`), but only as an exception.

SVP isn't just a rule—it's a foundation. It gives the team speed, safety, and focus. We wouldn't go back.
