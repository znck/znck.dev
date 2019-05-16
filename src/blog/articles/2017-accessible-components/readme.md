---
published: 2017-11-29
tags:
  - vue
  - accessibility
  - testing
---

# Accessible Components: Test Driven Approach

The web is undoubtedly most important resource today. Modern websites are built in small building blocks; **components**. Practices from test-driven software development have employed to automate correctness of these building blocks.

<!-- more -->

Being the most important source of information, internet should be accessible to all. It is important to provide equal access and opportunity to people with disabilities.

You can find many tools to check accessibility on web pages. But, in my opinion, when you’re testing web pages in a modern application, you’re are very late. Accessibility testing should be employed at the lowest level; you should create accessible components.

## Unit Testing Accessibility

Let’s simple component which renders following HTML:

```html
<button role="datepicker">test</button>
```

The `<button>` element has an invalid role value. We’ll validate generated HTML with [a11y](https://github.com/addyosmani/a11y) utility. ARIA [AX_ARIA_01](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_01) rule would fail with the following message:

Elements with ARIA roles must use a vaild, non-abstract ARIA role.

<figure data-type="code">

```html
<template>
  <button class="button" role="datepicker">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'MyButton'
}
</script>
```

<figcaption>Source of <code>button.vue</code></figcaption>

</figure>

<figure data-type="code">

```js
import it from 'ava'
import pify from 'pify'
import _a11y from 'a11y'
import _fs from 'fs'
import { mount } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'

import TargetComponent from '../src/Button.vue'

const renderer = createRenderer()
const a11y = pify(_a11y)
const fs = pify(_fs)

it('should be accessible', async t => {
  const w = mount({
    template: `<TargetComponent/>`,
    methods: { doSomething() {} },
    components: { TargetComponent }
  })
  const html = await renderer.renderToString(w.vm)
  const filename = '/tmp/a11y-test-source.html'

  await fs.writeFile(filename, `
  <!doctype html>
  <html lang=en>
    <head>
      <title>Test Component</title>
    </head>
    <body>
      ${html}
    </body>
  </html>
  `)

  const reports = await a11y(filename)

  reports.audit.forEach(report => {
    t.true(
      report.result !== 'FAIL',
      `[${report.severity.toUpperCase()}] ${report.heading}`
    )
  })
})
```

<figcaption>Source of <code>button.spec.js</code></figcaption>

</figure>

Above is a very simple example to check static HTML for accessibility. Next, I would be exploring techniques to test accessibility for all four types of disabilities — visual, auditory, motor and cognitive. [The a11y project](http://a11yproject.com/) has curated a list of rules as [web accessibility checklist](http://a11yproject.com/checklist), an automated tool to run these rules would be next step in my accessibility exploration.
