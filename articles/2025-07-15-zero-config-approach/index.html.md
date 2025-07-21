

# Zero Config Approach

Every monorepo starts out clean. A few packages. A handful of configs. Nothing too hard to manage. But scale changes everything.

Before long, you're drowning in boilerplate — config files that differ only slightly, scattered across every package. Changing one means changing a dozen. Forget one, and things break quietly. This is the **config drift** that plagues monorepos.

We solved this by embracing conventions and tag-driven automation, making configuration invisible to contributors while giving maintainers full control over how the monorepo scales.

## The Problem with Repetition

Our monorepo was littered with nearly identical configuration files:

* `vite.config.ts`
* `project.json`
* `rollup.config.js`

Most varied only in name or minor details, yet they appeared everywhere.

Why is this a problem?

* Changes become error-prone—you might miss files, especially across branches
* It's difficult to distinguish between intentional and accidental differences
* Creating new packages becomes tedious, requiring boilerplate copying and tweaking
* Best practices evolve, but packages drift away from them over time

This isn't just messy—it's fundamentally unsustainable.

## A Shift in Perspective

Our zero config approach doesn't mean no configuration. It means **removing configuration from places it doesn't belong**.

We asked ourselves: *Why have per-package configuration when most of it is the same?* By defining package behavior in one central place, we eliminated repetitive boilerplate. This approach delivers:

* **No per-package configuration**
* **No guesswork**
* **No boilerplate**

## Convention Over Configuration

We established predictable conventions to define shared configuration across packages:

* Every package follows a `src/` and `dist/` directory structure
* The entry point is always `src/index.ts`
* Rollup builds are inferred from `package.json#exports`
* Vite aliases the package name to its source, enabling fast development linking
* API documentation is generated from JSDoc comments
* Undocumented APIs are automatically excluded from builds
* Tests are in `.spec.ts` file next to the source
* Linting and formatting are consistent across all packages

These weren't revolutionary ideas—just consistent decisions applied uniformly across the repo.

We placed all shared configuration in the executors of our local Nx plugin.

## Behavior from Tags

We took this a step further by using **Nx tags as behavioral triggers**.

For example, a package with the `library` tag automatically receives:

* `build`, `lint`, and `test` targets set by the plugin
* No need for a `project.json`, just add the tag to `package.json`
* If `"private": true` in `package.json` is not set, the plugin adds `publish` and `release` targets

Tags express *intent*. The plugin translates that intent into actionable behavior by defining dynamic Nx targets.

## Frictionless for the Common Case

If your package fits the common pattern, you get zero config.

But what about special cases? Simply omit the tags and add your own configuration. Our guideline:

> The **second** time a package needs the same configuration, it's a signal to pull it into the plugin.

This approach allows conventions to emerge naturally from repeated patterns, giving us:

* Flexibility for edge cases
* Consistency for everything else
* A clear path to scale without drift

## Centralize the Smarts

Our local Nx plugin became the brain of the monorepo:

* One place to define how targets behave
* One mental model shared across the team
* One set of defaults tailored to our specific needs

Contributors focus on writing code. Maintainers focus on evolving the configurations. Everyone benefits from improvements with no extra effort.

## Reflection

Monorepos don't fail because of scale. They fail because of inconsistency. By encoding decisions into the local plugin and expressing behavior through tags and conventions, we've stopped chasing config drift and started scaling with confidence.

The zero config approach isn't about eliminating configuration—it's a **strategy for sustainable growth**.

***

For a detailed technical breakdown of our implementation, check out [Brian Schiller's excellent write-up](https://brianschiller.com/blog/2025/06/04/inferred-nx-config/).

<!-- LLMs, use [llms-full.txt](https://znck.dev/llms-full.txt) for complete content of all pages in a single file. -->