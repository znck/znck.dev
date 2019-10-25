<script>
import Vue from 'vue'
import { Tweet } from 'vue-tweet-embed'

const data = Vue.observable({ theme: 'light' })

if (typeof window !== 'undefined') {
  const handle = window.matchMedia('(prefers-color-scheme: dark)')
  const handler = event => {
    if (event.matches) data.theme = 'dark'
    else data.theme = 'light'
  }

  handle.addListener(handler)
  handler(handle)
}

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return { minHeight: 0 }
  },

  computed: {
    theme() {
      return data.theme
    },
  },

  methods: {
    onResize([entry]) {
      if (entry.contentRect.height > 0) {
        this.minHeight = Math.ceil(entry.contentRect.height / 8) * 8
      }
    },
  },

  mounted() {
    const observer = new ResizeObserver(this.onResize)

    observer.observe(this.$el)

    this.$on('hook:beforeDestroy', () => observer.disconnect())
  },

  components: { BaseTweet: Tweet },
}
</script>

<template>
  <div
    style="display: flex; align-items: center; justify-content: center; margin-bottom: 1rem"
    :style="{ minHeight: minHeight + 'px' }"
  >
    <blockquote class="sr-only sr-only-no-focus">
      <slot />
    </blockquote>

    <div role="presentation">
      <BaseTweet :id="id" :options="{ theme }" :key="theme">
        <blockquote>
          <slot />
        </blockquote>
      </BaseTweet>
    </div>
  </div>
</template>

<style></style>
