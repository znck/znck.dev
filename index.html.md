

# **[Rahul Kadyan](https://znck.me)**

I write about software, technology, and occasionally, life.

***

## 2026

**[Little Things Like These](articles/2026-01-04-small-things-like-these/index.html.md)** *(January 4, 2026)*\
A reflection on Claire Keegan's powerful novella about moral courage, silence, and the cost of conscience in 1980s Ireland.

## 2025

**[A No-Fuss Option Type for TypeScript](articles/2025-11-23-simple-option-type/index.html.md)** *(November 23, 2025)*\
A minimal Option type for TypeScript that expresses absence cleanly without defensive checks. Built on discriminated unions and control-flow narrowing to keep things simple and predictable.

**[Designing a result type that feels native in TypeScript](articles/2025-11-22-designing-a-result-type/index.html.md)** *(November 22, 2025)*\
A journey through designing a Result type that integrates naturally with TypeScript's control flow, using Promises as inspiration to create an error-handling pattern that feels like part of the language.

**[A Tale of Two Monorepos](articles/2025-07-16-a-tale-of-two-monorepos/index.html.md)** *(July 16, 2025)*\
In this post, I share the story of two monorepos I designed at work. One at work and one at home. The differences in their design, structure, and the lessons learned from each.

**[Zero Config Approach](articles/2025-07-15-zero-config-approach/index.html.md)** *(July 15, 2025)*\
Every monorepo starts out clean, but as it scales, configuration files can become a burden. This post discusses how we embraced conventions and tag-driven automation to eliminate repetitive boilerplate and configuration drift.

**[Reclaim Toolchain Ownership](articles/2025-07-14-reclaim-toolchain-ownership/index.html.md)** *(July 14, 2025)*\
Continuing the monorepo series, this post discusses the importance of owning your toolchain. It’s about customizing your development environment to fit your needs, rather than being constrained by default settings.

**[Single Version Policy](articles/2025-07-11-single-version-policy/index.html.md)** *(July 11, 2025)*\
Next in the series on monorepo learnings: how we tackled dependency chaos with a Single Version Policy. This approach ensures all packages share the same version of dependencies.

**[Before the Coffee Gets Cold](articles/2025-07-07-before-the-coffee-gets-cold/index.html.md)** *(July 7, 2025)*\
Would you go back in time if you cannot change the past? Before the Coffee Gets Cold is a gentle, meditative exploration of longing, regret, and unresolved feelings through the lens of time travel.

**[Package-First Philosophy](articles/2025-07-02-package-first-philosophy/index.html.md)** *(July 2, 2025)*\
Last year, I had the opportunity to design a monorepo at work. The experience taught me valuable lessons about code organization and team dynamics. This is the first in a series sharing those learnings—starting with how we made packages the center of our development universe.

## 2020

**[Negative feedback comes from a good place](articles/2020-01-14-appreciate-feedback/index.html.md)** *(January 14, 2020)*\
Reflections on the importance of honest feedback and how to give and receive it constructively in professional environments.

## 2019

**[Shipping Web Components with Vue](articles/2019-11-09-shipping-web-components-with-vue/index.html.md)** *(November 9, 2019)*\
A comprehensive guide on how to build and export Vue components as web components using Vue CLI and Rollup, making them reusable across different frameworks.

**[Simple Hard Things](articles/2019-06-10-simple-hard-things/index.html.md)** *(June 10, 2019)*\
Exploring the challenges of getting seemingly simple design details right, particularly around typography and spacing in web design.

**[Grammarly in Code](articles/2019-06-03-grammarly-in-code/index.html.md)** *(June 3, 2019)*\
The journey of building a VS Code extension to integrate Grammarly into the code editor, solving the pain of switching between editors while writing.

**[Finally Some Colors](articles/2019-06-03-finally-some-colors/index.html.md)** *(June 3, 2019)*\
Adding color and visual improvements to enhance the reading experience of a blog.

**[Comments in Code](articles/2019-05-26-comments-in-code/index.html.md)** *(May 26, 2019)*\
A detailed exploration of different types of code comments - clarification, documentation, license, reference, tagged, and control comments - with examples from Vue.js source.

**[Running an awesome conference](articles/2019-05-20-awesomeconf/index.html.md)** *(May 20, 2019)*\
The story of organizing Vue.js conferences in India, from the initial inspiration to the challenges and rewards of bringing the Vue community together.

## 2018

**[Type Vuex without TypeScript](articles/2018-11-20-type-vuex/index.html.md)** *(November 20, 2018)*\
A continuation guide showing how to add type checking and intellisense to Vuex stores using JSDoc annotations and helper patterns, without switching to TypeScript.

**[Type Vue without TypeScript](articles/2018-11-11-type-vue/index.html.md)** *(November 11, 2018)*\
A practical guide demonstrating how to get TypeScript-like type checking and intellisense in Vue components using JSDoc annotations and VS Code, without actually using TypeScript.

## 2017

**[Accessible Components: Test Driven Approach](articles/2017-11-29-accessible-components/index.html.md)** *(November 29, 2017)*\
How to use automated accessibility testing in Vue components to ensure they meet ARIA standards and provide inclusive user experiences.

**[Provide/Inject in Vue 2.2](articles/2017-03-10-provide-inject/index.html.md)** *(March 10, 2017)*\
An exploration of Vue's provide/inject feature introduced in version 2.2, showing how it enables dependency injection patterns for advanced component communication.

**[Fiddle with Vue.js](articles/2017-03-05-fiddle-with-vue/index.html.md)** *(March 5, 2017)*\
A guide for Vue.js contributors on how to create proper minimal reproductions for bug reports, including best practices for JSFiddle and repository setups.

**[First Day in Vue.js](articles/2017-03-03-first-day/index.html.md)** *(March 3, 2017)*\
The personal story of discovering Vue.js while struggling with Angular, and how Vue's simplicity and elegance made complex interactive features achievable in just a few hours.

<script>
(async () => {
  try {
    if (typeof navigator?.serviceWorker === 'undefined') {
      return;
    }

    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }

    // Also clear caches
    const cacheNames = await caches.keys();
    for (const cacheName of cacheNames) {
      await caches.delete(cacheName);
    }
  } catch {
    // Ignore
  }
})();
</script>

<!-- LLMs, use [llms-full.txt](https://znck.dev/llms-full.txt) for complete content of all pages in a single file. -->