---
published: 2017-03-10
tags:
  - vue
---

# Provide/Inject in Vue 2.2

The **Initial D** release of Vue have some amazing new features, including improved server side rendering, v-model customization, better error handling, provide & inject pair and many other small improvements.

The provide and inject pair offers data flow deep in descendant chain. Ancestor components can serve as dependency injector for all its descendants, regardless how deep the component hierarchy is. The feature is advertised for advance plugin/component usages.

## Workflow

It works in two parts — One component would provide data and other would use it (inject).

> The provide option should be an object or a function that returns an object. This object contains the properties that are available for injection into its descendants. You can use ES2015 Symbols as keys in this object, but only in environments that natively support Symbol and Reflect.ownKeys.

```js
const Provider = {
  provide: {
    foo: 'bar'
  }
}
```

> The inject options should be either an Array of strings or an object where the keys stand for the local binding name, and the value being the key (`string` or `Symbol`) to search for in available injections.

```js
const Child = {
  inject: ['foo']
}
```


<iframe width="100%" height="480" src="https://jsfiddle.net/znck/4v95vfh3/embedded/js,html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>


The provide/inject binding are **NOT** reactive. But if observed objects are provided, they do remain reactive.

```js
const Provider = {
  provide () {
    const foo = {}

    Object.defineProperty(foo, 'bar', {
        enumerable: true,
        get: () => this.bar,
    })

    return { foo }
  },

  data: () => ({ bar: 'baz' })
}
```

<figure data-type="code">
  <div data-iframe>
    <iframe width="100%" height="480" src="https://jsfiddle.net/znck/fdzwtz43/embedded/js,html,css,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
  </div>

  <figcaption>Reactive provide/inject example</figcaption>
</figure>

Injections are available in props and data. So, you could set prop defaults to injected data or you can use injections as initial data.

## Performance

Both provide and inject are one time actions performed at component initialisation. So, there won’t be any apparent performance degradation.

provide action is constant time.

For each injected property, inject would traverse the parent chain until first provider is reached.

## Conclusion

With provide/inject, you can provide data to distant descendent and that allows to create amazing functionalities. A whole new type of Vue plugins are about to appear.

For example: A parent component can inject validation messages in input components.

<iframe width="100%" height="480" src="https://jsfiddle.net/znck/go4yepc1/embedded/js,html,css,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
