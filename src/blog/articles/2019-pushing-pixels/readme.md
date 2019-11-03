---
published: 2019-12-07
tags:
  - vue
  - rendering
  - hydration
---

# Pushing pixels to the browser

We – frontend engineers – are in the business of rendering experiences on the users' screens. We have way too many ways of doing so, and the choice can be overwhelming.

<!-- more -->

As we start a new project, the first choice we encounter is picking a framework. "Should I use Vue or Angular or React or go vanilla?" – We do this over and over again. A google search – "X vs. Y" and we land on dozens of biases. I am not here to answer this question today. I would pick Vue any day as there is no reason not to do so.

Then the second immediate decision we have to make, how do we render the application – Client-Side Rendering or Server-Side-Rendering or a mix of both. However, this choice relatively a lot simpler than the frameworks. There are definite strengths and weaknesses of each that support specific use cases.

Client-Side Rendering (or CSR) and Server-Side Rendering (or SSR) are the ends of the spectra of sending pixels to the browser. So everything in between is a mix of two.

## Client-Side Rendering

CSR, as the name suggests, we send the required source (i.e., JavaScript) to the browser, and the browser paints the users' screen starting from a blank page. We handle all logic, data fetching, and routing on the browser side, and hence, client-side rendering.
