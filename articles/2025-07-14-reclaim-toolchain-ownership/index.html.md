

# Reclaim Toolchain Ownership

In my previous posts, I explored the benefits of building software with **small, focused packages** and maintaining **a single version of each dependency** across a monorepo. These practices bring structure to your codebase and simplify dependency management.

But structure and consistency alone won’t take you far enough.

To create a monorepo that scales you need something more: **ownership of your toolchain**.

## Defaults Aren’t Destiny

Most modern tools come with sensible defaults, which is helpful. But general defaults are just that—**general**. They don’t account for your specific needs: the number of web apps you manage, how your team works, or the way you want your documentation to look.

Over time, these default choices can create friction, for example:

* **Vite** runs dev servers on port `5173` by default. Add a second app, and you face port conflicts or random port assignments.
* **Storybook** assumes one instance per package, but a single global instance that aggregates all stories is often more practical.
* **API Documenter** generates one file per type, which can be overwhelming for small packages. A single-page reference is easier to navigate.

Individually, these issues aren't deal-breakers. But in a monorepo, every rough edge compounds, creating unnecessary complexity.

## What Toolchain Ownership Looks Like

Owning your toolchain doesn't mean reinventing every tool. It means tailoring the toolchain to fit *your* project.

Here's an example:

* Assigning stable, unique ports to each app—so you can run multiple servers without guessing.
* Centralizing Storybook into one instance—so contributors can access the full set of components in one place.
* Generating API docs as single pages—aligned with your package philosophy.

These adjustments may seem small, but they significantly improve the developer experience. And they're achievable because you control the tooling.

For instance, we use **Nx** to manage our monorepo. Instead of duplicating configurations across packages, we have a **local Nx plugin**.

This plugin acts as a central hub for:

* Defining custom executors (e.g., for `vite`, `storybook`, or `api-documenter`).
* Configuring generators and project scaffolding.
* Managing consistent setups across all packages.

This plugin provides **a programmable layer of control**, scoped to our repo but aligned with the Nx ecosystem. It's a single place to encode decisions, defaults, and custom logic.

## Customize, Don’t Fork

Customization can feel risky, as if you’re straying from the beaten path and making upgrades harder. But consider this:

> You upgrade a few times a year. You live with your tooling every day.

Daily experience matters more than theoretical upgradability. That said, customization doesn't mean going off-road. Most tools offer public extension points—**plugins, custom configurations, composable APIs**. Use these to stay close to the ecosystem while tailoring it to your needs.

Ownership doesn't mean doing everything yourself—it means being intentional about the defaults you keep and the ones you reshape.

## Avoiding Fragmentation

Without shared tooling, packages start to drift:

* One might use a slightly different `vite.config.ts`.
* Another might override the linter in ways that break formatting.
* A third might have a test setup that confuses new contributors.

This fragmentation leads to inefficiency and frustration—death by a thousand configs.

Toolchain ownership is the antidote. It provides **a single place to encode your opinions** and ensures consistent application across the repo.

## Reflection

Reclaiming your toolchain requires a mindset shift. It means treating tooling not as a black box or a necessary evil, but as an integral part of your product.

When you shape it with care—when you own it—the entire engineering experience improves: faster feedback, fewer surprises, better collaboration.
