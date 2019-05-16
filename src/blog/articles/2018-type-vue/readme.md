---
published: 2018-11-11
tags:
  - vue
  - typescript
  - dx
---

# Type Vue without TypeScript

A practical guide for type checking vue components written in JS and getting things done.

<!-- more -->

## Why do we need types?

In the last decade, browsers have become very powerful, allowing developers to build rich interactive applications. The interactivity and richness have come with an increase in complexity and size of the codebase in the frontend. Large complex codebases demand more attention and frontend teams have become larger.

When more than one developer collaborates, there is a requirement of clear interfaces and APIs. JavaScript is very flexible, but you cannot deduce the type of arguments a function would accept.

e.g., What do you think print function’s argument type is?

```js
function print(value) {
  console.log(value)
}
```

The type of value is ambiguous, even after looking at the source code of the print function which poses problems in large codebases where you cannot afford to jump into the source to deduce argument type of a function. One way to resolve this issue is to document the function’s API, but docs have a tendency of getting outdated.

**What if there were a way to know a function’s argument types by just glancing over the function name?**

Yes, there is a way: types or TypeScript.

```ts
function print(value: string) {
  console.log(value)
}
```

As soon as we look at the print function, we know value should be a string. That little information immediately boosts collaboration and productivity.

In some sense, types make APIs self-documenting. Apart from this, code editors/IDEs also benefit a lot from types. IDEs can provide intelligent suggestions, and display type mismatches inline.

<figure data-type="image" small>
  <div stack column>
    <img src="//cdn-images-1.medium.com/max/2000/1*6YOgNAKgooKirWp0ssrKBQ.png" alt="Screenshot: Intellisense/Type-based suggestion" />
    <img src="//cdn-images-1.medium.com/max/2288/1*yzyYVRkm_49DLVGnQoFReQ.png" alt="Screenshot: Type mismatch error" />
  </div>
  <figcaption>Intellisense/Type-based suggestion (top) — Type mismatch error (bottom)</figcaption>
</figure>

> Any application that _can_ be written in ~~JavaScript~~ TypeScript, _will_ eventually be written in ~~JavaScript~~ TypeScript.
>
> – ~~Jeff Atwood~~ Rahul Kadyan

## So TypeScript is it?

TypeScript makes interfaces explicit and enables collaboration, but it comes with its complexity and downsides.

- Additional time would be spent adding types.

- JavaScript’s flexibility is lost as we have to type everything and sometimes it gets very complicated to add types.

- A steep learning curve and retraining of developer staff.

## Vue and TypeScript

Vue provides a fluent object-based API for authoring composable components.

<figure data-type="code">

```js
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    add(text) {
      this.items.push({ text, done: false })
    },
    complete(index) {
      this.items[index].done = true
    }
  }
}
```

  <figcaption>Todo list component (JavaScript)</figcaption>
</figure>

The above component can be written in TypeScript as:

<figure data-type="code">

```ts
import { Component, Vue } from 'vue-property-decorator';

interface TodoItem {
  text: string
  done: boolean
}

@Component
export default class Todo extends Vue {
  private items!: TodoItem[]

  private add(text: string) {
    this.items.push({ text, done: false })
  }

  private complete(index: number) {
    this.items[index].done = true
  }
}
```

  <figcaption>Todo list component (TypeScript)</figcaption>
</figure>

With TypeScript, you get type based intellisense which boosts developer productivity.

<figure data-type="image" large>
  <div stack row wide>
    <img src="//cdn-images-1.medium.com/max/2000/1*B8sBq-sbvoVpAxc8rGyfRg.png" alt="VS Code type inference in Vue components written in JavaScript">
    <img src="//cdn-images-1.medium.com/max/2000/1*oQ8VX7IpBJJSyIghTFmLMw.png" alt="VS Code type inference in Vue components written in TypeScript">
  </div>

  <figcaption>VS Code type inference in Vue components written in JavaScript(left) and TypeScript(right)</figcaption>
</figure>

TypeScript support in Vue was an afterthought, and it becomes quite verbose in real-world applications. **_Good thing is that’s going to change with Vue 3 coming mid-next year._**

Adding types to Vuex is even more complex and unpleasant. Also, the intellisense on state/getter/actions mapped to components is almost non-existent.

> Most common bugs in Vue apps are not due to type errors.
>
> — Chris Fritz, Curator of Vue Docs

Yes, that’s true, and tools like ESLint are far more helpful in catching these bugs.

## So, do we need TypeScript at all?

Maybe but you don’t need to jump on it today. TypeScript ensures type safety, documents API interfaces and enables intellisense in IDEs. I feel intellisense is far more critical in Vue application projects than type safety.

The best thing about TypeScript is that **you can take advantage of TypeScript without using TypeScript**.

Yes, with VS Code and TypeScript, we can get intellisense in JavaScript files. We can enforce type safety too if we want that. VS Code infers JSDoc annotations to generate TypeScript definition on the fly. Let’s set up a JavaScript project with types and intellisense.

## Intellisense in JavaScript

In JavaScript files, VS Code infers types for static values to provide intellisense, including object property names, function return value type, and property types.

<figure data-type="image" large>
  <div stack column>
    <img src="//cdn-images-1.medium.com/max/2032/1*ZU2_ks9VEjE2tlXOXqvC4g.png" alt="VS Code type inference on object properties">
    <img src="//cdn-images-1.medium.com/max/2000/1*LYCLdgUn6Lpbaum46Udz-A.png" alt="return value from function">
  </div>

  <figcaption>VS Code type inference on object properties (top) and return value from function (bottom)</figcaption>
</figure>

VS Code has [automatic type acquisition](https://code.visualstudio.com/docs/languages/javascript#_automatic-type-acquisition) which uses npm package’s bundled types or community types from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) to provide intellisense, including method signature and parameter info. Also, using Vue’s type information and [Vetur plugin](https://marketplace.visualstudio.com/items?itemName=octref.vetur), it can provide rich completions and type information in .vue files too.

![Autocomplete Suggestions](https://cdn-images-1.medium.com/max/2860/1*xmS2QCLzZOOgGYYA0yNYqA.png)

![Type Inference](https://cdn-images-1.medium.com/max/2000/1*XR9jiqkDDE1xGRG24d9djw.png)

However, static type inference for array literals and dynamic values is not possible, for such cases, VS Code can use [JSDoc](http://usejsdoc.org) annotations to collect type information. In the following snippet, type of this.items is detected as an array of type any, as it’s known statically that this.items is an array, but there is no information about values in the array. We can use a@type annotation for adding type information to this.items, @type allows adding type information, similar to any typed language (or TypeScript).

![VS Code type inference in Vue components written in JavaScript](https://cdn-images-1.medium.com/max/2000/1*U9tfB6m3drWY0gJiiHjrVg.png)

![VS Code type inference in Vue components written in JavaScript with JSDoc annotation](https://cdn-images-1.medium.com/max/2000/1*6LcyKqSSm5R8WSMVJHkoIw.png)

VS Code type inference from JSDoc comments is as reasonable as TypeScript. See the following code snippets written in JavaScript and TypeScript.

![VS Code type inference in Vue components written in JavaScript](https://cdn-images-1.medium.com/max/2000/1*GWaM5Trrh3YR23D2iJDOQg.png)

![VS Code type inference in Vue components written in Typescript](https://cdn-images-1.medium.com/max/2000/1*sNhG-lwGgU8tjAfdG5QuXQ.png)

## Using JSDoc to add type information to Vue components

Vue component options have data, props, computed and methods which when provided with type information can significantly improve the developer experience.

## 1. Data

We have to provide @type annotations for properties which are impossible infer statically. e.g.:

<figure data-type="image">
  <div stack row wide>
    <img src="//cdn-images-1.medium.com/max/2000/1*H9Rb69WrRipcDC4bhlmfBg.png" alt="Vue component definition">
    <img src="//cdn-images-1.medium.com/max/2000/1*Kbgh1HGBSaIAsDe31PXJYQ.png" alt="Inferred type data object">
  </div>

  <figcaption>Vue component definition (left) and inferred type data object (right)</figcaption>
</figure>

In the above snippet, items and currentItem have incomplete type information, so we need@type annotations only for those two properties.

<figure data-type="image">
  <div stack row wide>
    <img src="//cdn-images-1.medium.com/max/2000/1*D1lM9kT8gZ1lPO8pT3bW6g.png" alt="Vue component definition">
    <img src="//cdn-images-1.medium.com/max/2000/1*5G5ZQf0ba2dRFoFU5Qcuag.png" alt="inferred type data object">
  </div>

  <figcaption>Vue component definition (left) and inferred type data object (right)</figcaption>
</figure>

Type definitions for items and currentItem are quite similar. If we were writing TypeScript, we would have created an interface for the item type. With JSDoc, we can define custom types or interfaces using a@typedef annotation.

<figure data-type="image">
  <div stack row>
    <img src="//cdn-images-1.medium.com/max/2000/1*vR5tRzbTEcROiJSA-mVVQQ.png" alt="JSDoc typedef example">
    <img src="//cdn-images-1.medium.com/max/2000/1*IySaWOMdmd32-radhmESqQ.png" alt="inferred type in VS Code">
  </div>

  <figcaption>JSDoc typedef example (left) and inferred type in VS Code (right)</figcaption>
</figure>

Autocomplete suggestions and type information for data are available on this context in life-cycle hooks, methods, computed and watch handlers.

## 2. Props

For primitive props, VS Code can infer type information automatically.

![Vue component options with props as object map of types](https://cdn-images-1.medium.com/max/3036/1*_tUZ2aPTdSXEeSUXlkyqSw.png){small}

![Vue component options with props as validator options having type key](https://cdn-images-1.medium.com/max/3036/1*uNLa2xftCkjE2uAM43pGtQ.png){small}

However, if you have Object or Array as the type, then auto-inferred type information is useless. In such cases, we have to provide type information with a @type annotation.

![Vue component options with props as object map of types having complex types](https://cdn-images-1.medium.com/max/3088/1*yIiD42VwK3yDjN0UZlZl_Q.png){small}

It even works with the validator options syntax for props.

![Vue component options with props as validator options having type key having complex types](https://cdn-images-1.medium.com/max/3088/1*PoCAZr99jP44VY1TUCSFDg.png){small}

When defining prop names as an array, it's a little complex to provide type information. It is discouraged to use names array for props definition.

![Discouraged syntax for prop definition in Vue component options](https://cdn-images-1.medium.com/max/3088/1*sRCHlsbVeM4oDB6w0UJ4gw.png){small}

## 3. Computed

For computed properties, automatic return type inference does not work as expected but it does provide computed property names in suggestions.

![Vue component’s computed property in VS Code suggestions](https://cdn-images-1.medium.com/max/2144/1*8JPFQUL9C9VeGS-BxaHHiA.png)

So with a @returns annotation, we can provide type information for the returned value as well.

![Vue component’s computed property with type information inferred from JSDoc in VS Code suggestions](https://cdn-images-1.medium.com/max/3036/1*oKOtC7OH_kMQBQCWcmRaKw.png){small}

## 4. Methods

Method names are available in VS Code suggestions on this context, but they lack type information.

![Vue component’s method name autocomplete suggestion in VS Code](https://cdn-images-1.medium.com/max/3088/1*Os8ktq0lGa18yFvtyWvzEw.png){small}

Here, we see the add method accepts one parameter text and returns a number, the auto inferred information is already beneficial, and if we can provide type information for the text parameter, we get the complete experience of a typed language. Moreover, we can add types to parameters using the `@param` annotation.

![Vue component’s method name autocomplete suggestion in VS Code with complete type information](https://cdn-images-1.medium.com/max/3088/1*lVRO_W5mpkbtMf4NrJSJPw.png){small}

We can even provide a small description of the method if it’s not clear from its name.

![Vue component’s method name autocomplete suggestion in VS Code with complete type information and custom description](https://cdn-images-1.medium.com/max/3088/1*tYkeav3nsLSXwpKazSZHTg.png){small}

VS Code supports even more JSDoc annotations; you can find the complete list of supported annotations on the [VS Code wiki page](https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript).

## Can we do strict type checks in JavaScript?

Yes, it’s possible, add `// @ts-check` at the start of the script in .vue file.

![Strict type check errors in JavaScript](https://cdn-images-1.medium.com/max/3088/1*WTKeJ-dhT6bko9a5cO4pCg.png)

If you want to enable strict type checks in the whole project, then you should add a jsconfig.json file to the project root.

```json
{
  "compilerOptions": {
    "checkJs": true
  }
}
```

You can find more options at the [jsconfig.json reference](https://code.visualstudio.com/docs/languages/jsconfig).

> _I will be writing a separate article for adding type information with vuex and vue-router._
