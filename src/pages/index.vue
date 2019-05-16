<script>
import ArticleList from '@/components/article-list'

export default {
  components: { ArticleList },
}
</script>

<template>
  <div class="home">
    <header class="header">
      <div class="hey font-alternate">Hey!</div>

      <h1 class="title">
        I am Rahul Kadyan.
      </h1>

      <p>
        I am building
        <i>design language system</i> at
        <a href="https://myntra.com" target="_blank" rel="noopener noreferrer"
          >Myntra</a
        >. Prior that, I was making way for
        <a
          href="http://kotlinlang.org"
          target="_blank"
          rel="noopener noreferrer"
          >kotlin</a
        >
        into Myntra's stack.
      </p>

      <p>
        Running
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
        in Bangalore. Also, I contribute to
        <a
          href="https://github.com/znck"
          target="_blank"
          rel="noopener noreferrer"
          >vue ecosystem</a
        >
        and yeah...
        <strong>Core Team Member</strong>!
      </p>

      <p>
        I speak at conferences, and meetups. Here is something for you to read:
      </p>
    </header>

    <hr class="sep" />

    <ArticleList :latest="5" />
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
