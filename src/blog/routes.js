export default [
  {
    name: '@blog/2017-accessible-components',
    path: '/blog/2017-accessible-components',
    component: () =>
      import('@/blog/articles/2017-accessible-components/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Accessible Components: Test Driven Approach',
      excerpt:
        '<p>The web is undoubtedly the most vital resource today. Modern websites are built-in small building blocks; <strong>components</strong>. Practices from test-driven software development have employed to automate the correctness of these building blocks.</p>\n',
      published: '2017-11-29T00:00:00.000Z',
      tags: ['vue', 'accessibility', 'testing'],
    },
  },

  {
    name: '@blog/2017-fiddle-with-vue',
    path: '/blog/2017-fiddle-with-vue',
    component: () =>
      import('@/blog/articles/2017-fiddle-with-vue/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Fiddle with Vue.js',
      excerpt:
        '<p>If you’ve created an issue on Vue.js repository for the first time then there is high probability that you skipped reading the contribution guidelines. By doing so you’ve created an issue that does not tell maintainers a thing and helps nobody.\nNext, you would be hit with a template response and your issue would be labelled need repro.</p>\n',
      published: '2017-03-05T00:00:00.000Z',
      tags: ['vue', 'javascript'],
    },
  },

  {
    name: '@blog/2017-first-day',
    path: '/blog/2017-first-day',
    component: () =>
      import('@/blog/articles/2017-first-day/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'First Day in Vue.js',
      excerpt: '<p>A memory log of my first day using Vue.js.</p>',
      published: '2017-03-03T00:00:00.000Z',
      tags: ['vue', 'experience', 'javascript'],
    },
  },

  {
    name: '@blog/2017-provide-inject',
    path: '/blog/2017-provide-inject',
    component: () =>
      import('@/blog/articles/2017-provide-inject/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Provide/Inject in Vue 2.2',
      excerpt:
        '<p>The <strong>Initial D</strong> release of Vue have some amazing new features, including improved server side rendering, v-model customization, better error handling, provide &amp; inject pair and many other small improvements.</p>\n',
      published: '2017-03-10T00:00:00.000Z',
      tags: ['vue'],
    },
  },

  {
    name: '@blog/2018-type-vue',
    path: '/blog/2018-type-vue',
    component: () =>
      import('@/blog/articles/2018-type-vue/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Type Vue without TypeScript',
      excerpt:
        '<p>A practical guide for type checking vue components written in JS and getting things done.</p>\n',
      published: '2018-11-11T00:00:00.000Z',
      tags: ['vue', 'typescript', 'dx'],
    },
  },

  {
    name: '@blog/2018-type-vuex',
    path: '/blog/2018-type-vuex',
    component: () =>
      import('@/blog/articles/2018-type-vuex/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Type Vuex without TypeScript',
      excerpt:
        '<p>A practical guide for type checking vuex modules written in JS and getting things done.</p>',
      published: '2018-11-20T00:00:00.000Z',
      tags: ['vue', 'typescript', 'dx'],
    },
  },

  {
    name: '@blog/2019-awesomeconf',
    path: '/blog/2019-awesomeconf',
    component: () =>
      import('@/blog/articles/2019-awesomeconf/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Running an awesome conference',
      excerpt:
        '<p>I love attending conferences. For inspiring talks, for making new friends and meeting old friends, or for learning new things, conferences have been influential in my journey as a developer. I like many conferences, but I want to be in every vue conference. If you been to a vue Conference, then you know that there’s something different about it. The environment is so welcoming and friendly. Sad! I have to travel across the world to be in one. I have longed to see a vue conference in India, my home, for a long time now.</p>\n',
      published: '2019-05-20T00:00:00.000Z',
      tags: [],
    },
  },

  {
    name: '@blog/2019-comments-in-code',
    path: '/blog/2019-comments-in-code',
    component: () =>
      import('@/blog/articles/2019-comments-in-code/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Comments in Code',
      excerpt:
        '<p>So one more pull request got rejected for having a comment; &quot;Good code is self-documenting.&quot;, said the reviewer.</p>\n',
      published: '2019-05-26T00:00:00.000Z',
      tags: ['programming', 'coding style'],
    },
  },

  {
    name: '@blog/2019-finally-some-colors',
    path: '/blog/2019-finally-some-colors',
    component: () =>
      import('@/blog/articles/2019-finally-some-colors/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Finally some colors in my life',
      excerpt:
        '<p>&quot;I got a red shirt!&quot;, I scream, every time my friends jab that my wardrobe is grey and dull. They always call me out, &quot;Get some colors, dude!&quot;.</p>\n',
      published: '2019-06-03T00:00:00.000Z',
      tags: ['design', 'color', 'eli5'],
    },
  },

  {
    name: '@blog/2019-grammarly-in-code',
    path: '/blog/2019-grammarly-in-code',
    component: () =>
      import('@/blog/articles/2019-grammarly-in-code/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Grammarly in Code',
      excerpt:
        '<p>There\'s no simpler writing tool than markdown. There\'s no elegant editor than <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer">code<OutboundLink/></a>. There\'s no better writing environment than markdown in <span title="VS Code">code</span>. It\'s perfect, but whenever I write, I find myself copy-pasting back and forth between Grammarly editor and VS Code editor. Grammarly makes my writing much better, but it also forces me to use their editor. Don\'t take me wrong I don\'t hate their editor, in fact, I kind of like it — clean, spacious, and responsive. But it\'s not sufficient for me as my articles generally have images, code snippets, figures, and sometimes markup. The lack of syntax highlight for markdown and markup is an absolute deal-breaker. If Grammarly worked in VS Code editor, wouldn\'t that be perfect?</p>\n',
      published: '2019-11-09T00:00:00.000Z',
      tags: ['diy', 'vscode', 'extension'],
    },
  },

  {
    name: '@blog/2019-shipping-web-components-with-vue',
    path: '/blog/2019-shipping-web-components-with-vue',
    component: () =>
      import('@/blog/articles/2019-shipping-web-components-with-vue/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Shipping Web Components with Vue',
      excerpt:
        '<p>I have been watching the web component spec. However, all the projects I have worked on were either using Vue or React, and these frameworks are more than capable of building complex applications. I never felt like using web components, but that changed yesterday.</p>\n',
      published: '2019-10-28T00:00:00.000Z',
      tags: ['vue', 'web-components', 'rollup-plugin-vue'],
    },
  },

  {
    name: '@blog/2019-simple-hard-things',
    path: '/blog/2019-simple-hard-things',
    component: () =>
      import('@/blog/articles/2019-simple-hard-things/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Simple Hard Things',
      excerpt:
        '<p>Simple things are easy; everyone says so. However, in reality, it may not be so.</p>\n',
      published: '2019-06-10T00:00:00.000Z',
      tags: ['design', 'general'],
    },
  },

  {
    name: '@blog/2020-appreciate-feedback',
    path: '/blog/2020-appreciate-feedback',
    component: () =>
      import('@/blog/articles/2020-appreciate-feedback/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Negative feedback comes from a good place',
      excerpt:
        "<p>It's not easy to say negative things to people. In fact, it takes a lot of courage to point out the shortcoming. If someone does that for me, honest and brutal, I keep them close. Brutal and honest friends are dearest to me.</p>\n",
      published: '2020-01-14T00:00:00.000Z',
      tags: [],
    },
  },

  {
    name: '@blog/2020-on-building-an-input-component',
    path: '/blog/2020-on-building-an-input-component',
    component: () =>
      import('@/blog/articles/2020-on-building-an-input-component/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'On building an input component',
      excerpt:
        "<p>I have been associated with the vuejs community for some years, but I didn't get to use vuejs much. I mean, I used it in my side-projects, talk and workshop demos, for this blog website, and some other simple webpages. Recently, I started working for a company whose main project is written in vuejs. The first task I got to do was building a date picker.</p>\n<p>This application had something already in place, an amalgam of 3rd party libraries and local style overrides. All the hacks and style overrides, still, it couldn't meet the UX needs. I am sure the users weren't very cheery about it.</p>\n",
      published: '2020-02-01T00:00:00.000Z',
      tags: ['vue', 'components'],
    },
  },
]
