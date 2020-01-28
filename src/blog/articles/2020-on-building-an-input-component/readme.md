---
published: 2020-02-01
tags:
  - vue
  - components
related:
  - https://web.dev/more-capable-form-controls/
---

# On building an input component

I have been associated with the vuejs community for some years, but I didn't get to use vuejs much. I mean, I used it in my side-projects, talk and workshop demos, for this blog website, and some other simple webpages. Recently, I started working for a company whose main project is written in vuejs. The first task I got to do was building a date picker.

This application had something already in place, an amalgam of 3rd party libraries and local style overrides. All the hacks and style overrides, still, it couldn't meet the UX needs. I am sure the users weren't very cheery about it.

<!-- more -->

I started working on the date picker. A date picker is not a regular component, it has to support many expectations. It has to collect input from the users, which makes them distinctive. A date picker is an input component.

I created a new file, `InputDate.vue`.

## Component vs Input Component

Why the name `InputDate`? We'll arrive there soon, but first, what is an input component?

A component is like a custom tag. It encapsulates a particular behaviour and displays an interface. It can be a header, or a part of a header, or a card, or anything repeatable. It can also act as an `<input>` element.

Whenever a component consciously/unconsciously collects data from users which means it behaves like `<input>`, it becomes an **input component**.

In a Vue application, you can use the `v-model` directive to bind JavaScript state to an `<input>` element value. We would want to support that in our input component, that and a whole list of other features.

## Requirements of an Input Component

If you've worked with aria roles, then you know that a `<div>` can be used as `<button>`. When a browser sees a `<div>` with `role="button"`, it treats it as a button and expects it to behave like a button. If this `<div>` doesn't function like a button, then users would think "it's broken".

We, developers, have the same kind of expectations from an input component, it should behave like an input element. So, the expectations from an input component are:

> We know `props` and `slots` make the API of a component. We would be focusing on `props`, and hence we will collect all requirements as TypeScript interface for `props`.

### Should support `v-model` API

First and foremost, we would want to use `v-model`.

```vue
<InputDate v-model="birthday" />
```

And I have a personal convention, if a component allows using `v-model` directive, its name should have `Input` prefix. Hence, the name `<InputDate>`.

To support `v-model`, a component is required to accept `value` prop and emit `input` event when `value` changes.

```ts
interface InputDateProps {
  /** The selected date value */
  value: Date

  /** Emitted when [value] prop changes */
  onInput(value: Date): void
}
```

### Should support name

The `name` attribute associates an `<input>` element to the closet `<form>` ancestor element, which means on form submit the `FormData` object would have the value of this input.

```ts
interface InputDateProps {
  /** The name to register as, in the parent <form>. */
  name: string
}
```

Since we are creating a custom element, it's our responsibility to associate it with the parent `<form>` element. One easy way would be to create a hidden `<input>` element with the serialized value of `<InputDate>`.

```vue
<template>
  ...
  <input type="hidden" v-bind:name="name" v-bind:value="serializedValue" />
  ...
</template>
```

This hidden `<input>` would automatically associate to the parent.

### Should be keyboard-focusable

There should be a visible focusable element in the component.

If there are no focusable element in the component, then the wrapping element should have `tabindex` attribute set to `0`.

### Should support autofocus

The `autofocus` attribute allows capturing user focus to an `<input>` element, this generally helps in building better form experiences. So, it's reasonable to expect the same form an input component.

```ts
interface InputDateProps {
  /** Capture user focus on mounted. */
  autofocus: boolean
}
```

### Should support autocomplete

### Should support readOnly

### Should support disabled

### Should provide validity state

### Should be keyboard-accessible

### Should be screenreader-accessible

## Deciding on the API

## Future-proofing your input components

## Summary
