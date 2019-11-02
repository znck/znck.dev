<script>
import ArticleList from '@/components/article-list'

export default {
  components: { ArticleList },
  head: {
    meta: [
      { property: 'og:type', content: 'profile' },
      { property: 'og:title', content: "znck's blog" },
      { property: 'og:url', content: 'https://znck.dev/' },
      { property: 'og:image', content: 'https://znck.dev/social-image.png' },
      { property: 'profile:first_name', content: 'Rahul' },
      { property: 'profile:last_name', content: 'Kadyan' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@znck0' },
      { name: 'twitter:title', content: "znck's blog" },
      {
        name: 'twitter:description',
        content: 'I write about JavaScript, Vue, and Design.',
      },
      { name: 'twitter:image', content: 'https://znck.dev/social-image.png' },
    ],
  },
}
</script>

<template>
  <div class="home">
    <header class="header" aria-label="About Me">
      <div class="hey font-alternate">Hey!</div>

      <h1 class="title">
        I am
        <a href="https://znck.me" target="_blank">Rahul Kadyan</a>.
      </h1>

      <p>
        I am running
        <a
          href="https://awesomeconf.dev"
          target="_blank"
          rel="noopener noreferrer"
          >an awesome conference</a
        >
        and
        <a
          href="https://blr.vue.community/"
          target="_blank"
          rel="noopener noreferrer"
          >a vue meetup</a
        >
        in Bangalore. And I contribute to the
        <a
          href="https://github.com/znck"
          target="_blank"
          rel="noopener noreferrer"
          >vue ecosystem</a
        >
        as a
        <strong>core team member</strong>.
      </p>

      <p>Here is something for you to read:</p>
    </header>

    <hr class="sep" aria-hidden="true" />

    <main id="main-content" aria-label="My articles">
      <ArticleList :latest="5" />
    </main>
  </div>
</template>

<style scoped lang="scss">
@import '@design';

.home {
  padding: 5rem 1rem;
}

.header p {
  @include font('p.article');
}

.hey {
  @include font('h3');
  color: text-color('accent');
  margin: 0;

  @include dark-mode() {
    color: text-color('today');
  }
}

.title {
  margin-top: -0.5rem;
  margin-bottom: 1rem;
}

.sep {
  border: none;
  border-bottom: 1px solid;
  margin: 0;
  margin-top: -1px;
  margin-bottom: 3rem;
  padding-top: 1rem;
  opacity: 0.2;
}
</style>
