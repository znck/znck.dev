

# Fiddle with Vue.js

If you’ve created an issue on Vue.js repository for the first time then there is high probability that you skipped reading the contribution guidelines. By doing so you’ve created an issue that does not tell maintainers a thing and helps nobody.
Next, you would be hit with a template response and your issue would be labelled need repro.

## What is need repro?

Issues labelled need reproduction or need repro are ignored by maintainers. Maintainers want to fix every issue but they can’t, until they could recreate same issue and find out what is causing it. A copy & paste of console log or “Your shit is broken. Fix it!”, is not helping these guys.

## Why should you create a repro?

> I work on a lot of different open source projects. I really do like building software that makes other people’s lives easier, but it’s crazy time-consuming. One of the most time-consuming parts is responding to issues. A lot of OSS maintainers will bend over backwards to try and understand your specific problem and diagnose it, to the point of setting up new test projects, fussing around with different Node versions, reading the documentation for build tools that we don’t use, debugging problems in third party dependencies that appear to be involved in the problem… and so on. I’ve personally spent hundreds of hours of my free time doing these sorts of things to try and help people out, because I want to be a responsible maintainer and I want the users of my software to be productive and happy.
> But it’s not sustainable.
> So I’m instituting a new rule: if you report an issue, you must have a minimal reproduction that demonstrates the problem. You might think you’ve already provided a repro — in fact you might have spent a lot of time figuring out where you think the problem lies, and writing instructions for maintainers to follow, and we’re grateful for that. But if you got sent here, it’s because it’s not enough.

This is an extract from [Rich Harris](https://github.com/Rich-Harris)’ gist on “[Please include a repro](https://gist.github.com/Rich-Harris/88c5fc2ac6dc941b22e7996af05d70ff)”.

## How to create a repro?

To maintainers, it seems trivial to create a repro but most people struggle isolating the issue and recreating it on jsfiddle (or others), some don’t want to share details of their project and some are just lazy.
You can use jsfiddle/jsbin to reproduce your issue. If you need a build tool then scaffold a repository using `vue build` tool. Following is a step by step process I follow when creating an issue:

### To create a repro on jsfiddle

* **Start with a template:** You should use a template, it saves time and better than an empty screen to get started. Use template (<https://jsfiddle.net/39epgLj0/>) from Vue’s contribution guidelines.
* **Write minimal code:** If your fiddle has few lines it is more likely to be solved faster, as it is easier to comprehend small code and issue is already isolated all we have to do is find the cause. You can start pasting the code from your project and strip off all unnecessary stuff and then replace the data with fakes.
* **Explicitly define dependencies:** Jsfiddle allows you to add external dependencies but rather you should add a script tag with <https://unpkg.com/> link.
* **Follow coding style:** If every one follows same code style then cognitive friction of reading others' code is reduced. [Pablo Henrique](https://github.com/pablohpsilva) has prepared an [extensive code style guide](https://pablohpsilva.github.io/vuejs-component-style-guide/), you should follow that.
  > ~~undefined~~
* **Add comments:** Describe your intent in code. Comments guide readers to understand your code better and be on same page as you’re.
  I’ve created an example fiddle demonstration.

<iframe width="100%" height="480" src="https://jsfiddle.net/znck/hm2sfh4r/embedded/js,html,css,result/dark/" allowfullscreen="allowfullscreen"  frameborder="0"></iframe>

### To create a repro repository

* **Use Vue build tool:** You can create zero configuration development setup using vue build. Go through documentation (<https://github.com/vuejs/vue-cli/blob/master/docs/build.md>) to know more.

* **Include README.md:** Describe your issue briefly and provide steps to produce the issue. Following is an example README.md

  ```markdown
  # Issue: rollup build fails when shared cache

  When using the rollup option `separateCaches` to speed up successive builds for `gulp.watch`,
  I get an error on each rebuild. On the first run it builds successfully because `separateCaches` is `undefined`.

  ## Steps to reproduce

  - Run `gulp watch`
  - Update something in a .js file

  > Related issues: #55, #97
  ```

* **Push to Github:** Create a github repository and push the repro code.

### To create an issue

Always follow contribution guidelines. I know it’s really difficult to read a large article when you’re stuck with an issue. That is why Vue.js team is experimenting with a tool to help users to create issues. It is not in production yet but you can use the prototype (<http://vue-issue.surge.sh/>).
