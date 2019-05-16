<template>
  <article
    :class="$style.layout"
    :style="{ '--article-cover-inset': height + 'px' }"
  >
    <div v-if="$currentPageMeta.cover" :class="$style.cover">
      <img :src="cover.src" :style="cover.style" :class="$style.coverImg" />
      <div :class="$style.overlay" />
    </div>

    <header :class="$style.header" ref="header">
      <ul
        v-if="$currentPageMeta.tags"
        class="font-alternate"
        :class="$style.tags"
      >
        <li v-for="tag in $currentPageMeta.tags" :key="tag">#{{ tag }}</li>
      </ul>

      <h1 :class="$style.title">{{ $currentPageMeta.title }}</h1>

      <p :class="$style.meta" class="font-heading dateline">
        <span class="author">
          by
          <strong>Rahul Kadyan</strong> |
        </span>

        <span class="published">
          published on
          <strong>{{ published }}</strong>
        </span>

        <span v-if="updated" class="updated">
          &middot; updated on
          <strong>{{ updated }}</strong>
        </span>
      </p>
    </header>

    <hr :class="$style.sep" />

    <div :class="$style.content">
      <router-view />
    </div>
  </article>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill'

export default {
  head: {
    title() {
      return {
        inner: this.$currentPageMeta.title,
      }
    },
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/atom-one-dark.min.css',
        media: '(prefers-color-scheme: dark)',
        id: 'highlight-dark',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/atom-one-light.min.css',
        media:
          '(prefers-color-scheme: light), (prefers-color-scheme: no-preference)',
        id: 'highlight-light',
      },
    ],
  },
  data() {
    return {
      height: null,
    }
  },
  mounted() {
    const observer = new ResizeObserver(entries => {
      const first = entries[0]

      if (first) {
        this.height = -first.contentRect.height - 40 // Padding & Margin
      }
    })

    observer.observe(this.$refs.header)

    this.observer = observer
  },
  beforeDestroyed() {
    this.observer.unobserve(this.$refs.header)
    delete this.observer
  },
  computed: {
    published() {
      const date = new Date(this.$currentPageMeta.published)

      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    },
    updated() {
      const { updated } = this.$currentPageMeta

      if (!updated) return null

      const date = new Date(updated)

      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    },
    cover() {
      const cover = this.$currentPageMeta.cover

      if (!cover) return null

      const src = typeof cover === 'string' ? cover : cover.src
      const position = typeof cover === 'object' ? cover.position : null

      return {
        src,
        style: {
          'object-position': position,
        },
      }
    },
  },
}
</script>

<style module lang="scss">
@import '@design';

.layout {
  p,
  li {
    @include font('p.article');
  }

  figure[data-type='image'] {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;

    > *:first-child {
      flex: 1;
    }

    img {
      width: 100%;
      height: 1%;
      object-fit: contain;
    }

    figcaption {
      text-align: center;
      @include font('ui');
      font-family: font-family('ui');
      margin-top: 1rem;
    }

    height: 14rem;

    &[small] {
      height: 10rem;
    }

    &[large] {
      height: 20rem;
    }

    @include above('desktop') {
      height: 30rem;

      &[small] {
        height: 20rem;
      }

      &[large] {
        height: 36rem;
      }
    }
  }

  figure[data-type='code'] {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;

    figcaption {
      text-align: center;
      @include font('ui');
      font-family: font-family('ui');
    }
  }

  ul {
    margin: 1rem 0;
  }

  code {
    font-family: font-family('code');
    line-height: 1; // Remove 1px added in paragraph height.
  }

  pre,
  div[data-iframe] {
    margin: 1rem 0;
    overflow: hidden;
    border-radius: radius('small');
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1); // TODO: Extract to token.
  }

  div[data-iframe] > iframe {
    border: none;
    margin: 0;
    margin-bottom: -6px;
  }

  pre > code {
    display: block;
    font-family: font-family('code');
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    @include font('code');
  }

  blockquote {
    margin: 2rem 0;
    padding-left: 1.75rem;
    font-style: italic;
    border-left: 0.25rem solid color('gray-light');

    @include dark-mode() {
      border-left-color: color('gray-dark');
    }
  }

  div[stack] {
    display: flex;
    overflow: auto;

    &[wide] {
      width: 100vw;
      @include above('desktop') {
        margin-left: calc(-50vw + 400px);
      }
    }

    > * {
      display: block;
      width: auto !important;
      flex: 1 1 auto;
      margin: 0 0.5rem;
    }

    &[row] {
      flex-direction: row;

      > * {
        height: 100%;
      }
    }

    &[column] {
      flex-direction: column;
    }
  }

  padding: 1rem;
  margin: 0 auto;
  // text-rendering: optimizeLegibility;

  @include above('desktop') {
    padding: 5rem 0;
    width: 800px;
  }
}

.cover {
  height: 400px;
  margin-top: -1rem;
  @include above('desktop') {
    margin-top: -5rem;
  }
  z-index: 1;

  + .header {
    margin-top: var(
      --article-cover-inset,
      -136px
    ); // TODO: Calculate this if line breaks.
    color: text-color('light');

    + .sep {
      border-color: transparent;
    }
  }
}

.coverImg,
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  z-index: -1;
  object-fit: cover;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.4);
}

.title {
  margin-top: -0.5rem;
  margin-bottom: 0;
}

.tags {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 0.5rem;
  @include font('tag');

  color: text-color('accent');
  @include dark-mode() {
    color: text-color('today');
  }

  > li {
    display: inline-block;
    margin-right: 0.5rem;
  }
}

.layout .meta {
  margin: 0;
  margin-bottom: 1.5rem;
  font-weight: 300;
  @include font('p');

  strong {
    font-weight: 500;
  }
}

.sep {
  border: none;
  border-bottom: 1px solid;
  margin: 0;
  margin-top: -1px;
  padding-top: 1rem;
  opacity: 0.2;
}

.content {
  margin-top: 2.5rem;
}
</style>
