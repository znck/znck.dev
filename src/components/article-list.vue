<script>
import articles from '@/blog/routes'

export default {
  data() {
    const sorted = articles.slice()

    sorted.sort((a, b) => {
      return (
        new Date(b.meta.published).getTime() -
        new Date(a.meta.published).getTime()
      )
    })

    return {
      articles: Object.freeze(sorted),
    }
  },
}
</script>

<template>
  <ul :class="$style.articles">
    <li
      v-for="(article, index) in articles"
      :key="article.name"
      :class="$style.article"
    >
      <article>
        <p style="margin-bottom: -1.5rem; margin-top: 0; padding-left: 0.25rem">
          {{
            new Date(article.meta.published).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </p>
        <h2 :id="`article-${index}-heading`" :class="$style.title">
          {{ article.meta.title }}
        </h2>

        <div class="summary" v-html="article.meta.excerpt" />

        <div :class="$style.footer">
          <router-link :to="{ name: article.name }">
            read more
            <span class="sr-only-no-focus"
              >about "{{ article.meta.title }}"</span
            >
          </router-link>
        </div>
      </article>
    </li>
  </ul>
</template>

<style lang="scss" module>
@import '@design';
.articles {
  list-style: none;
  margin: 0;
  padding: 0;
}

.article {
  margin-bottom: 3.5rem;
}

.article p {
  margin-bottom: 2rem;
  @include font('p.summary');
}

.title {
  margin-bottom: 0;
}

.footer {
  margin-top: -1.5rem;
  color: text-color('accent');
  @include font('ui');

  @include dark-mode() {
    color: text-color('today');
  }
}
</style>
