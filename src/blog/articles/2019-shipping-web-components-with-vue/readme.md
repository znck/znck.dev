---
published: 2019-10-28
tags:
  - vue
  - web-components
  - rollup-plugin-vue
---

# Shipping Web Components with Vue

I have been watching the web component spec. However, all the projects I have worked on were either using Vue or React, and these frameworks are more than capable of building complex applications. I never felt like using web components, but that changed yesterday.

<!-- more -->

I was reading an article, and as usual, the reader mode on safari was turned on. There was an embedded tweet in the article, and it preserved the twitter styling even in the reading mode. It was surprising to me as I couldn't make the code snippets on my blog to maintain syntax highlights. I wondered what trickery was going behind the embedded — surprisingly, the magic was just a web component.

I decided to write a web component for code snippets on my blog.

## Web Component Spec

Web component spec is a meta-specification which depends on four other specs.

- The Custom Elements specification
- The shadow DOM specification
- The HTML Template specification
- The ES module specification

The web components are part of the native web platform, and they allow us to write genuinely reusable elements. But, I miss the convenience of a Vue SFC. I miss computed properties and declarative event handler registration. Won't it be nice if we could write Vue components and ship web components?

## Shipping Web Components with Vue CLI

Vue CLI supports exporting Vue components to web components.

Let's take an example Vue component.

<figure data-type="code">

<<< ./my-component.vue

<figcaption>A sample Vue component</figcaption>
</figure>

We have to create a wrapper to export this Vue component as a web component.

<figure data-type="code">

<<< ./my-component-wrapper.js

<figcaption>An exmaple of web component wrapper utility for Vue component</figcaption>
</figure>

And using Vue CLI, we can export a web component.

<figure data-type="code">

```bash
vue build -t wc -n my-component my-component-wrapper.js
```

<figcaption>Vue CLI command to export web component</figcaption>
</figure>

The exported web component works like a charm, but the code outputted is obscure.

<figure data-type="code">

<<< ./my-component.cli.js

<figcaption>Web component export of the example component using Vue CLI</figcaption>
</figure>

## Shipping Web Components with Rollup

We would use the same example component and export web component using rollup.

<figure data-type="code">

<<< ./rollup.config.js

<figcaption>Rollup config to build Vue component as web component</figcaption>
</figure>

And we get a much readable output source for the exported web component.

<figure data-type="code">

<<< ./my-component.esm.js

<figcaption>Web component export of the example component using rollup-plugin-vue</figcaption>
</figure>

The web component exported by the above Rollup config is an ES module, and you have to bundle it in your application. However, we can also ship browser compatible web components using Rollup.

### Web Component export as UMD package

The <abbr title="Universal Module Definition">UMD</abbr> output format is directly executable in the browser, and we have to make small tweaks to above Rollup config to generate a UMD build.

<figure data-type="code">

<<< ./rollup.config.browser.js

<figcaption>Rollup config to build Vue component as web component in UMD format</figcaption>
</figure>

And you can use this web component directly in HTML.

<figure data-type="code">

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>my-component demo</title>
    <script src="https://unpkg.com/vue"></script>
    <script src="./my-component.umd.js"></script>
  </head>

  <body>
    <my-component></my-component>
  </body>
</html>
```

<figcaption>Example code to consume the above exported web component</figcaption>
</figure>

> **NOTE:**
>
> The web components exported by Vue CLI or RollupPluginVue would require Vue as a dependency.
> If you are planning to use the above-built web component in a React or Angular application, you have to ship Vue runtime too.
