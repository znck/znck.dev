---
published: 2020-01-27
tags:
  - vue
  - components
related:
  - https://web.dev/more-capable-form-controls/
---

# On building an input component

I have been associated with the vuejs community for some years now. But I didn't get to use vuejs, I mean I used it in my side-projects, talk and workshop demos, for this blog website, and some other simple webpages. Recently, I started working for a company whose main project is written in vuejs. And the first task I got to do was building a date picker component.

This application had something already in place—an amalgam of 3rd party libraries and local style overrides, still it couldn't meet the needs of the team. And I am sure the users were not having a good time using it. So, I started working on the date picker, the component, the input component, the `InputDate` component.

<!-- more -->

## Component vs Input Component

Why the name `InputDate`? We'll arrive there soon, but first, what is an input component?

I think of a component as a custom element (a tag like `div` or `h1`), reusable, yes. But, it also encapsulates particular behaviour and presents an interface to the user. It can act as a header, or a part of a header, or a card, or a section, something repeatable or breakable part of an application/a webpage.

But, a component can act as `<input>` element and collect some data from the user, or it can act as `<select>` and prompt users to pick an option. Or it can present an entirely new way of data collection, not yet supported by the browsers. Whenever a component consciously/unconsciously collects data from users, it becomes an **input component**.

In a Vue application, you can use the `v-model` directive to bind data to `<input>` element. We would want to support that in our input component, that and a whole list of other features (I'd say requirement).

## Requirements of an Input Component

If you've worked with aria roles then you know, you can make browsers to treat a `<div>` as if it were a button by simply adding `role="button"` to it. But that's not it. Yes, the browser thinks that a `<div>` is a button and it expects the `<div>` to behave like a button. It should be focusable, it should be pressable with the space key and all other things we expect from a button. We have to build all those features into this `<div>`, so users don't feel that the button is broken or weird.

We, developers, have the same kind of expectations from an input component, it should behave like an input element. So, the expectation or say the requirements of an input component are:

### Should support `v-model` API

### Should be keyboard-focusable

### Should be keyboard-accessible

### Should support autofocus

### Should support autocomplete

### Should support readOnly

### Should support disabled

### Should provide validity state

### Should be screenreader-accessible

## Future-proofing your input components

## Summary
