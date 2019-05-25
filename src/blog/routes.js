export default [
  {
    name: '@blog/2017-accessible-components',
    path: 'blog/2017-accessible-components',
    component: () =>
      import('@/blog/articles/2017-accessible-components/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Accessible Components: Test Driven Approach',
      excerpt:
        '<p>The web is undoubtedly most important resource today. Modern websites are built in small building blocks; <strong>components</strong>. Practices from test-driven software development have employed to automate correctness of these building blocks.</p>\n',
      published: '2017-11-29T00:00:00.000Z',
    },
  },

  {
    name: '@blog/2017-fiddle-with-vue',
    path: 'blog/2017-fiddle-with-vue',
    component: () =>
      import('@/blog/articles/2017-fiddle-with-vue/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Fiddle with Vue.js',
      excerpt:
        '<p>If you’ve created an issue on Vue.js repository for the first time then there is high probability that you skipped reading the contribution guidelines. By doing so you’ve created an issue that does not tell maintainers a thing and helps nobody.\nNext, you would be hit with a template response and your issue would be labelled need repro.</p>\n',
      published: '2017-03-05T00:00:00.000Z',
    },
  },

  {
    name: '@blog/2017-first-day',
    path: 'blog/2017-first-day',
    component: () =>
      import('@/blog/articles/2017-first-day/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'First Day in Vue.js',
      excerpt: '<p>A memory log of my first day using Vue.js.</p>',
      published: '2017-03-03T00:00:00.000Z',
    },
  },

  {
    name: '@blog/2017-provide-inject',
    path: 'blog/2017-provide-inject',
    component: () =>
      import('@/blog/articles/2017-provide-inject/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Provide/Inject in Vue 2.2',
      excerpt:
        '<p>The <strong>Initial D</strong> release of Vue have some amazing new features, including improved server side rendering, v-model customization, better error handling, provide &amp; inject pair and many other small improvements.</p>\n',
      published: '2017-03-10T00:00:00.000Z',
    },
  },

  {
    name: '@blog/2018-type-vue',
    path: 'blog/2018-type-vue',
    component: () =>
      import('@/blog/articles/2018-type-vue/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Type Vue without TypeScript',
      excerpt: '<p>A practical guide for type checking vue components written in JS and getting things done.</p>\n',
      published: '2018-11-11T00:00:00.000Z',
    },
  },

  {
    name: '@blog/2018-type-vuex',
    path: 'blog/2018-type-vuex',
    component: () =>
      import('@/blog/articles/2018-type-vuex/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Type Vuex without TypeScript',
      excerpt: '<p>A practical guide for type checking vuex modules written in JS and getting things done.</p>',
      published: '2018-11-20T00:00:00.000Z',
    },
  },

  {
    name: '@blog/2019-awesomeconf',
    path: 'blog/2019-awesomeconf',
    component: () =>
      import('@/blog/articles/2019-awesomeconf/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Running an awesome conference',
      excerpt:
        '<p>I love attending conferences. For inspiring talks, for making new friends and meeting old friends, or for learning new things, conferences have been influential in my journey as a developer.  I like many conferences, but I want to be in every vue conference. If you been to a vue Conference, then you know that there’s something different about it. The environment is so welcoming and friendly. Sad! I have to travel across the world to be in one. I have longed to see a vue conference in India, my home, for a long time now.</p>\n',
      published: '2019-05-20T00:00:00.000Z',
    },
  },

  {
    name: '@blog/2019-comments-in-code',
    path: 'blog/2019-comments-in-code',
    component: () =>
      import('@/blog/articles/2019-comments-in-code/readme.md')
        .then(m => m.default)
        .then(component => ({ ...component, layout: 'article' })),
    meta: {
      title: 'Comments in Code',
      excerpt:
        '<p>So one more pull requests got rejected for having a comment. &quot;Good code is self-documenting.&quot;, said the reviewer.</p>\n',
      published: '2019-05-27T00:00:00.000Z',
    },
  },
]
