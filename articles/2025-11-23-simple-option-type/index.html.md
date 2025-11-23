

# A No‑Fuss Option Type for TypeScript

Whenever I parse input, read configuration, or look up values in a map, I hit the same problem: sometimes a value is present, sometimes it isn't. JavaScript gives us `undefined`, `null`, and a long trail of defensive `if` checks. None of these carry any semantic meaning.

In many languages, this problem has a well‑known solution: the `Option` type. It shows up in Rust, Swift, OCaml, Haskell, Scala—every ecosystem that wants a clean way to express absence without falling back to ad‑hoc conventions.

I wanted a version of that pattern that fits naturally into TypeScript. Something small, intuitive, and aligned with the language's control‑flow analysis.

That led me to this implementation of `Option<T>`.

## A simple Option for TypeScript

`Option<T>` represents either:

* a present value — `Some<T>`
* or explicit absence — `None`

In TypeScript, it looks like this:

```ts
interface Protocol<T> {
  orElse(defaultValue: T): T
}

interface Some<T> extends Protocol<T> {
  readonly ok: true
  readonly value: T
}

interface None<T> extends Protocol<T> {
  readonly ok: false
}

export type Option<T> = Some<T> | None<T>
```

The `ok` flag gives us precise narrowing:

```ts
if (option.ok) {
  // option is Some<T>
  console.log(option.value)
} else {
  // option is None
}
```

At runtime, both variants use a small internal class, but callers only see the plain union. This keeps the type simple without adding extra complexity.

The only extra convenience shared between `Some` and `None` is a small `orElse` method for choosing a default value. It keeps the type practical without adding complexity.

## Design decisions

### 1. Discriminated unions as the primary interface

The most important part of `Option` isn't a helper method, it's the discriminant:

```ts
if (option.ok) {
  // happy path
} else {
  // nothing here
}
```

This plays directly into TypeScript's control‑flow analysis. There's no need for custom `isSome` or `isNone` helpers; the language already understands how to narrow on a boolean flag.

This mirrors the design of my `Result` type: the smallest possible surface that lets TypeScript do most of the heavy lifting.

### 2. A singleton `None`

`None` has no payload, so there's no reason to allocate a new object every time. I use a singleton:

```ts
let NONE_INSTANCE: None | null = null

function none(): None {
  return (NONE_INSTANCE ??= new OptionImpl<never>(false) as None)
}
```

This keeps things simple and avoids creating new objects when we don't need to.

### 3. A tiny protocol: `orElse`

Every Option implements the `Protocol<T>` interface:

```ts
orElse(defaultValue: T): T
```

This gives you a clean way to fall back to a default value:

```ts
const port = Option.from(env.PORT).orElse(3000)
```

It covers the common case where you either branch on `option.ok` or you want a safe fallback. No extra abstractions needed.

### 4. Small and intuitive API

The goal is to keep `Option` small and easy to use. No extra abstractions or hidden behavior, just a clear way to express when a value exists and when it doesn't.

This simplicity keeps the type practical and lightweight in everyday code.

## Factory functions

The public API is intentionally small:

* `Option.some(value)`
* `Option.none()`
* `Option.from(value)`

The last one is particularly helpful when dealing with nullable values:

```ts
const name = Option.from(env.USER_NAME)
```

`Option.from` treats `null` and `undefined` as absence.

## How it feels in practice

### Parsing

```ts
function parsePort(raw: string): Option<number> {
  const port = Number(raw)
  return Number.isInteger(port) ? Option.some(port) : Option.none()
}

const port = parsePort(raw).orElse(defaultPort)
startServer(port)
```

### Map lookups

```ts
function get<K, V>(map: Map<K, V>, key: K): Option<V> {
  return map.has(key) ? Option.some(map.get(key)!) : Option.none()
}
```

## Relationship to Result

`Option` and `Result` naturally work well together. They are siblings.

* `Option<T>` — absence is *expected*.
* `Result<T>` — failure is *meaningful* and carries information.

A useful pattern is:

```ts
Result.from(option)
```

This turns `None` into a typed error, which is helpful in validation flows.

The main point is simple: `Option` stays small. It avoids extra helpers and relies on TypeScript's narrowing to do the work.

## Implementation

For a sample implementation of this Option type, see this gist:
[e671d54a](https://gist.github.com/znck/36b61f9d4ae927e70cfe04d6e671d54a)

<!-- LLMs, use [llms-full.txt](https://znck.dev/llms-full.txt) for complete content of all pages in a single file. -->