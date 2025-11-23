

# Designing a result type that feels native in TypeScript

Over the years, I've worked in several TypeScript codebases that leaned heavily on fp-ts, Effect, and a few homegrown FP-inspired Result types. They all had good intentions, but they never felt like TypeScript. Each brought its own mental model, its own vocabulary, and its own way of composing functions. When you're deep in those systems, you start thinking in terms of `Either`, `Task`, `Effect`, `pipe`, and typeclass instances, not in terms of the language you're actually writing.

Every time I switched projects, the error‑handling dialect changed. Some teams wrapped everything in `TaskEither`, others used custom monads, others mixed Promises and union types in creative ways. Reading the code felt like switching between programming languages inside TypeScript.

I kept wondering: *why does error handling feel so foreign when the language already has clear ideas about control flow?*

That question eventually led me toward something simpler, a Result type that fits directly into the language instead of sitting on top of it.

This article is about how I arrived there, and the one idea that finally made the design snap into place.

## Why I wanted a result type

Most TypeScript code I write falls into two categories:

1. **Synchronous logic**
   Parsing, validating, mapping, sanitizing, the parts of the system where failures are expected and should be surfaced explicitly.

2. **Asynchronous boundaries**
   Network calls, file IO, database access, areas where failures usually show up as thrown errors.

TypeScript already gives us a built-in way to express *asynchronous* failure:

```ts
const value = await something() // may throw
```

But synchronous failure is where things usually fall apart:

* throwing errors without clear intent,
* returning `undefined` without meaning,
* shaping errors differently in every function.

A `Result<T, E>` helps make failures explicit. But many existing libraries bring extra cognitive load by introducing new models, new vocabulary, and new patterns that feel heavier than the problem itself.

I wanted something that fits the language instead of working around it.

## The key insight: promises are already results

This is the idea that suddenly made everything clear:

**A `Promise<T>` is already a Result.**

It represents:

```
T  |  throws Error
```

Which is conceptually identical to:

```
Result<T, Error>
```

A function returning a Promise is a throwing function, and the caller must catch or propagate errors. This means we already have one built-in “Result monad,” whether we call it that or not.

Once you see this, a natural split emerges:

**Use `Result<T>` for synchronous failure.**

**Use `Promise<T>` for asynchronous failure.**

Instead of mixing the two worlds, it helped to look at them side by side:

```ts
async function foo(): Promise<T> {
  // may throw, caller handles with try/catch or await
}

function foo(): Result<T> {
  // may fail, caller handles through the value
}
```

Both forms communicate that the function can fail, but in different domains. Promises work well for asynchronous operations. Result works well for synchronous operations. Keeping these two paths clear turned out to be a useful guiding principle.

## A Result that works with the language

At the type level, the shape is familiar:

```ts
interface Success<T> {
  readonly ok: true
  readonly value: T
}

interface Failure<E extends Error> {
  readonly ok: false
  readonly error: E
}

type Result<T, E extends Error = Error> = Success<T> | Failure<E>
```

It integrates with both styles of code because it behaves like a Promise when awaited and like a simple value when used inside generators. This dual shape leads to a few helpful properties:

### 1. It's `PromiseLike`

You can `await` a Result:

```ts
const user = await Result.success({ id: 1 })
//    ^?  { id: number }
```

* A success resolves.
* A failure rejects.

This makes Result ergonomic in async code similar to Promise.

### 2. It's iterable via `yield*`

A `Result` implements `Symbol.iterator`, which means you can use it inside generator pipelines:

```ts
const result = Result.gen(function* () {
  const user = yield* findUser()
  const account = yield* findAccount(user.id)
  return Result.success({ user, account })
})
```

The generator stops on the first failure and returns that Result. It's a synchronous equivalent of `async/await`, but without the boilerplate of `if (!ok) return failure`.

### 3. The API stays intentionally small

* `Result.success`
* `Result.failure`
* `Result.all`
* `Result.gen`

No combinators, no transformers, no monad vocabulary. JavaScript's control flow and TypeScript's narrowing do most of the work.

## How It Feels to Use

### Synchronous code

Here is a simple example of a function that returns a `Result<T>` instead of throwing:

```ts
function parseUser(json: string): Result<User> {
  try {
    const data = JSON.parse(json)
    return Result.success(validateUser(data))
  } catch {
    return Result.failure(new Error('Invalid JSON'))
  }
}
```

This function can fail, but the failure is carried through the return value. The caller decides how to handle it.

In synchronous code, you handle the error by checking the result:

```ts
const result = parseUser(raw)

if (!result.ok) {
  return respond(400, result.error.message)
}

useUser(result.value)
```

### Asynchronous code

In asynchronous code, failure is expressed through Promise rejection:

```ts
async function loadUser(id: string): Promise<string> {
  const res = await fetch(`/api/users/${id}`)
  if (!res.ok) throw new Error('User not found')
  return res.text()
}
```

You can still combine async failure and sync `Result`-based failure cleanly inside the same function:

```ts
async function handleRequest(id: string) {
  try {
    const raw = await loadUser(id) // Promise<string>, may throw
    const parsed = await parseUser(raw) // Result<User>, may throw

    return successResponse(parsed) // happy path
  } catch (error) {
    return errorResponse(error)
  }
}
```

This shows the split: synchronous code returns `Result<T>` and the caller inspects the value, asynchronous code returns `Promise<T>` and the caller uses `try` and `catch`. Both styles fit naturally inside the same function without getting in each other's way.

## Sequential logic with `Result.gen`

`Result.gen` lets you write readable, sequential workflows:

```ts
const profile = Result.gen(function* () {
  const user = yield* parseUser(raw)
  const settings = yield* parseSettings(raw)
  return Result.success({ user, settings })
})
```

It reads top-to-bottom, stops on the first failure, and keeps everything synchronous. It also mirrors how async code behaves with `await`, which makes synchronous and asynchronous error handling feel similar and easier to follow. 

## Aggregating errors with `Result.all`

Sometimes you want to run multiple independent synchronous operations and collect everything:

```ts
const result = Result.all([parseUser(rawUser), parseSettings(rawSettings), parsePreferences(rawPrefs)])
```

If all succeed, you get a typed tuple.
If anything fails, you get an `AggregateError` with all the failures.

This makes validation pipelines cleaner and more honest.

## Why this approach feels natural in TypeScript

What surprised me most is how little machinery I needed.

* TypeScript's union narrowing does the heavy lifting.
* JavaScript's `await` and exceptions already model async failure.
* Generators provide a clean way to express synchronous pipelines.

The Result type stayed small and clear while still being practical for real projects. It works because it builds directly on the language's own primitives.

## What I learned

* Promises and Results express the same idea in different parts of the language. Use each where it fits.
* Keeping failure paths separate makes code easier to follow.
* Generators offer a clear way to write synchronous pipelines.
* Small abstractions work best when they build on what the language already gives you.

This Result type is not a new model for error handling. It simply makes the existing patterns clearer and easier to use.

## What's next

This Result type is one part of a small set of utilities I've been building for my own projects, along with `Option`, a typed `Exception` system, and a lightweight JSON codec.

Each of those pieces deserves its own write-up.

## Implementation

For a sample implementation of this Result type, see this gist:
[8a3259b7](https://gist.github.com/znck/24ea135632523d8ef06c805f8a3259b7)

<!-- LLMs, use [llms-full.txt](https://znck.dev/llms-full.txt) for complete content of all pages in a single file. -->