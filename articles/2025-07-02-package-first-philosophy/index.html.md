

# Package-First Philosophy

A year ago, we were facing a common challenge: a sprawling codebase where everything was interconnected. Fixing one issue often broke something else. Refactors felt like high-stakes operations. Code reviews were slow and confusing because no one was clear on ownership. It was a familiar problem, and it was draining.

We decided to change that—not just with better tooling, but by reshaping the way we thought about code.

So we made a simple bet: **make packages the center of the universe**.

## Why Package-First?

If something deserves a name, it deserves a package.

In our world, a package is a unit of structure, ownership, and contribution. It owns its code, tests, documentation, and public interface. It’s a contract—not just to the system, but to the team maintaining it.

This model provides several benefits:

* **Isolation**: Changes in one package stay within that package.
* **Ownership**: Contributors are responsible for specific, focused units.
* **Autonomy**: You don’t need to coordinate across teams to ship new features.
* **Composability**: Small components can be combined to create larger systems.
* **Focus**: The smaller the surface area, the easier it is to reason about.

The side effect? Simpler code, fewer arguments, faster reviews, and clearer responsibilities.

## Habits, Triggers, and Code

While reading *The Power of Habit* by Charles Duhigg, one idea stood out: habits are built on cues, routines, and rewards. Change the cue, and the routine often follows.

That resonated with our experience.

Once we made it easy to create a new package—just a few keystrokes and a scaffolded module was ready—developers started defaulting to it. The friction was gone. The cue shifted: instead of asking "where should I add this code?", the new instinct became "should I create a new package for this?"

The result? A new habit. Modular thinking became automatic. Developers started creating focused packages, with clear interfaces and isolated tests. The reward was immediate: fewer merge conflicts, faster reviews, and a deeper sense of ownership.

As Duhigg puts it, once a habit loop is established, it reinforces itself. The package-first mindset became that loop.

## Enabling Package-First Development

Making package creation easy was a game-changer. Teams stopped overloading existing modules and started creating new packages instead. The monolith didn’t shrink, but it became much more understandable.

We used Nx and pnpm to implement this, but the tools were just the means to an end. Here’s what we focused on:

* **Nx generators**: These scaffold fully functional packages for known types—`utility`, `tool`, `feature`, or `app`. Each package comes with build, test, lint, and documentation preconfigured.
* **Ready-to-use packages**: No extra setup required. Just start writing code.
* **Explicit public interfaces**: All public interfaces are clearly marked with `@public`, and we enforce this through tooling.

As friction disappeared, hesitation followed suit. Developers iterated faster, experimented more, and by default, wrote more modular code.

## Metadata is Ownership

Every package clearly defines its owner, where to file bugs, and what it does. But the real power is in the metadata: the `package.json` often tells you more than the code itself. It communicates intent, capabilities, and responsibilities—all without opening a single `.ts` file.

Here’s how it works:

* **Ownership metadata** drives the routing of code reviews, ensuring that the right people are involved.
* **Capability metadata** enables feature discovery and helps developers understand what each package is responsible for.
* **Dependency metadata** powers impact analysis, letting you know how changes will affect other parts of the codebase.

This isn’t just documentation—it’s operational infrastructure. By treating packages as self-describing units, we gain confidence across the board, and this structure supports automated tooling and decision-making.

## Scale by Design

When everything is a package:

* Teams onboard faster because they understand exactly where to find and contribute to code.
* Features become portable, easily shared and reused.
* Applications become compositions rather than monolithic systems.
* Dependencies stay local, reducing complexity and risk.

It’s not magic—it’s just structure. And structure scales.

In the first six months, we saw over 80 new packages created, many by teams who had never worked in this repo before. That wasn’t just a win for tooling—it was a shift in how people thought about software: small, manageable units, clear contracts, and fast feedback.

As we leaned further into the package-first model, it reinforced itself. Better structure led to better habits. Better habits led to better software.
